# 源码篇 --- libuv
libuv是一个基于事件驱动的异步 I/O 模型，刚开始是为 node.js 设计的一个跨平台库

![](/node/libuv.jpg)
## 1. libuv基础
### 1.1 Event Loops
事件驱动编程中，程序会关注每一个事件。libuv 负责将来自操作系统的事件收集起来，或者监视其它来源的事件。用户就可以注册回调函数，会在事件触发时被调用。*event-loop 会一直保持运行状态*。

传统的 I/O 操作都是阻塞式的，但是 文件 I/O，网络 I/O 所花的时间是要比 CPU 处理时间多得多的，**阻塞式 I/O 显然是一个很大的性能障碍**。
- 阻塞式 I/O 两种解决方案
    - 多线程：每个阻塞的 I/O 操作都会被分配到各个线程中（或者线程池），每当线程阻塞，处理器就可以调度处理其它需要 cpu 资源的线程
    - 异步非阻塞：
### 1.2 Error handling
异步执行的函数，会在执行失败的时候，给它的回调函数传递一个状态参数，错误信息被定义为 [UV_E***](https://libuv-docs-chinese.readthedocs.io/zh/latest/errors.html)
### 1.3 Handles and Requests
```c
/* Handle types. */
typedef struct uv_loop_s uv_loop_t;
typedef struct uv_handle_s uv_handle_t;
typedef struct uv_dir_s uv_dir_t;
typedef struct uv_stream_s uv_stream_t;
typedef struct uv_tcp_s uv_tcp_t;
typedef struct uv_udp_s uv_udp_t;
typedef struct uv_pipe_s uv_pipe_t;
typedef struct uv_tty_s uv_tty_t;
typedef struct uv_poll_s uv_poll_t;
typedef struct uv_timer_s uv_timer_t;
typedef struct uv_prepare_s uv_prepare_t;
typedef struct uv_check_s uv_check_t;
typedef struct uv_idle_s uv_idle_t;
typedef struct uv_async_s uv_async_t;
typedef struct uv_process_s uv_process_t;
typedef struct uv_fs_event_s uv_fs_event_t;
typedef struct uv_fs_poll_s uv_fs_poll_t;
typedef struct uv_signal_s uv_signal_t;

/* Request types. */
typedef struct uv_req_s uv_req_t;
typedef struct uv_getaddrinfo_s uv_getaddrinfo_t;
typedef struct uv_getnameinfo_s uv_getnameinfo_t;
typedef struct uv_shutdown_s uv_shutdown_t;
typedef struct uv_write_s uv_write_t;
typedef struct uv_connect_s uv_connect_t;
typedef struct uv_udp_send_s uv_udp_send_t;
typedef struct uv_fs_s uv_fs_t;
typedef struct uv_work_s uv_work_t;
typedef struct uv_random_s uv_random_t;

/* None of the above. */
typedef struct uv_env_item_s uv_env_item_t;
typedef struct uv_cpu_info_s uv_cpu_info_t;
typedef struct uv_interface_address_s uv_interface_address_t;
typedef struct uv_dirent_s uv_dirent_t;
typedef struct uv_passwd_s uv_passwd_t;
typedef struct uv_utsname_s uv_utsname_t;
typedef struct uv_statfs_s uv_statfs_t;
```
#### 1.3.1 handles
表示能够在活动时执行某些操作的长生命周期对象。
#### 1.3.2 requests
短暂性对象，通常只维持一个回调函数的时间。用来在初始函数和回调函数之间，传递上下文。

## 2. 文件系统
### 2.1 Reading/Writing files
``` js
// 文件描述符的获取 与 关闭
int uv_fs_open(uv_loop_t* loop, uv_fs_t* req, const char* path, int flags, int mode, uv_fs_cb cb)
int uv_fs_close(uv_loop_t* loop, uv_fs_t* req, uv_file file, uv_fs_cb cb)
```
### 2.2 Filesystem operations
### 2.3 Buffers and Streams
``` c
// src/*/stream.c    
int uv_read_start(uv_stream_t*, uv_alloc_cb alloc_cb, uv_read_cb read_cb);
int uv_read_stop(uv_stream_t*);
int uv_write(uv_write_t* req, uv_stream_t* handle,
                 const uv_buf_t bufs[], unsigned int nbufs, uv_write_cb cb);
```
### 2.4 File change events

## 3. 网络
### 3.1 TCP
TCP 是面向链接的字节流协议
#### 3.1.1 server
1. `uv_tcp_init` 建立tcp句柄
2. `uv_tcp_bind` 绑定
3. `uv_listen` 建立监听，当有新的连接到来时，激活调用函数
4. `uv_accept` 接收连接
5. 使用 stream 来处理和客户端的通信

客户端建立连接之后，调用 `on_new_connection` 需要使用 `uv_acceptt` 去建立一个与客户端 socket 通信的句柄，同时开始读取流中的数据
``` c
// /docs/code/tcp-echo-server/main.c
void on_new_connection(uv_stream_t *server, int status) {
    if (status < 0) {
        fprintf(stderr, "New connection error %s\n", uv_strerror(status));
        // error!
        return;
    }

    uv_tcp_t *client = (uv_tcp_t*) malloc(sizeof(uv_tcp_t));
    uv_tcp_init(loop, client);
    if (uv_accept(server, (uv_stream_t*) client) == 0) {
        uv_read_start((uv_stream_t*) client, alloc_buffer, echo_read);
    }
    else {
        // socket 不需要时，需要手动断开
        uv_close((uv_handle_t*) client, NULL);
    }
}
```
#### 3.1.2 client
客户端使用 `uv_tcp_connect`建立连接，当连接建立时，回调函数会被调用
``` c
uv_tcp_t* socket = (uv_tcp_t*)malloc(sizeof(uv_tcp_t));
uv_tcp_init(loop, socket);

uv_connect_t* connect = (uv_connect_t*)malloc(sizeof(uv_connect_t));

struct sockaddr_in dest;
uv_ip4_addr("127.0.0.1", 80, &dest);

uv_tcp_connect(connect, socket, dest, on_connect);
```
### 3.2 UDP
用户数据报协议(User Datagram Protocol)提供无连接的，不可靠的网络通信。因此 libuv 提供的不是基于 stream 的实现，而是提供了 `uv_udp_t` 句柄和 `uv_udp_send_t` 。
``` c
// /docs/code/udp-dhcp/main.c
uv_loop_t *loop;
uv_udp_t send_socket;
uv_udp_t recv_socket;

void on_read(uv_udp_t *req, ssize_t nread, const uv_buf_t *buf, const struct sockaddr *addr, unsigned flags) {
    // ...
}

int main() {
    loop = uv_default_loop();

    uv_udp_init(loop, &recv_socket);
    struct sockaddr_in recv_addr;
    uv_ip4_addr("0.0.0.0", 68, &recv_addr);
    uv_udp_bind(&recv_socket, (const struct sockaddr *)&recv_addr, UV_UDP_REUSEADDR);
    uv_udp_recv_start(&recv_socket, alloc_buffer, on_read);

    uv_udp_init(loop, &send_socket);
    struct sockaddr_in broadcast_addr;
    uv_ip4_addr("0.0.0.0", 0, &broadcast_addr);
    uv_udp_bind(&send_socket, (const struct sockaddr *)&broadcast_addr, 0);
    uv_udp_set_broadcast(&send_socket, 1);

    uv_udp_send_t send_req;
    uv_buf_t discover_msg = make_discover_msg();

    struct sockaddr_in send_addr;
    uv_ip4_addr("255.255.255.255", 67, &send_addr);
    uv_udp_send(&send_req, &send_socket, &discover_msg, 1, (const struct sockaddr *)&send_addr, on_send);

    return uv_run(loop, UV_RUN_DEFAULT);
}
```
### 3.3 Querying DNS
- `uv_getaddrinfo`：libuv 的异步 DNS 解决方案
``` c
// /docs/code/dns/main.c
int main() {
    loop = uv_default_loop();

    struct addrinfo hints;
    hints.ai_family = PF_INET;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_protocol = IPPROTO_TCP;
    hints.ai_flags = 0;

    uv_getaddrinfo_t resolver;
    fprintf(stderr, "irc.freenode.net is... ");
    int r = uv_getaddrinfo(loop, &resolver, on_resolved, "irc.freenode.net", "6667", &hints);

    if (r) {
        fprintf(stderr, "getaddrinfo call error %s\n", uv_err_name(r));
        return 1;
    }
    return uv_run(loop, UV_RUN_DEFAULT);
}
```
### 3.4 Network interfaces
- `uv_interface_addresses` 获取系统的网络信息接口
``` c
// /docs/code/interfaces/main.c
int main() {
    char buf[512];
    uv_interface_address_t *info;
    int count, i;

    uv_interface_addresses(&info, &count);
    i = count;

    printf("Number of interfaces: %d\n", count);
    // 一个物理层会有多个 IP 地址，is_internal 可以表示是否是内部 IP
    while (i--) {  
        uv_interface_address_t interface = info[i];

        printf("Name: %s\n", interface.name);
        printf("Internal? %s\n", interface.is_internal ? "Yes" : "No");

        if (interface.address.address4.sin_family == AF_INET) {
            uv_ip4_name(&interface.address.address4, buf, sizeof(buf));
            printf("IPv4 address: %s\n", buf);
        }
        else if (interface.address.address4.sin_family == AF_INET6) {
            uv_ip6_name(&interface.address.address6, buf, sizeof(buf));
            printf("IPv6 address: %s\n", buf);
        }

        printf("\n");
    }

    uv_free_interface_addresses(info, count);
    return 0;
}
```



<br>
<br>

**博文参考**
- [https://luohaha.github.io/Chinese-uvbook/source/basics_of_libuv.html](https://luohaha.github.io/Chinese-uvbook/source/basics_of_libuv.html)