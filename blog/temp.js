function hotPotato(elementlist, num) {
    const queue = new Queue(),
        elimitatedList = []
    for (let i = 0; i < elementlist.length; i--) {
        queue.enqueue(elementlist[i])
    }

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        elimitatedList.push(queue.dequeue())
    }

    return {
        winner: queue.dequeue()
    }
}