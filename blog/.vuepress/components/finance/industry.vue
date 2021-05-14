<template>
    <div>
        <table class="industry-table">
            <tr>
                <th>一级行业</th>
                <th>二级行业</th>
                <th>三级行业</th>
            </tr>
            <template v-for="industry_1 in industry_list">
                <tr>
                    <td class="industry-table__level-1"
                        :rowspan="
                            (industry_1.children && industry_1.children.reduce(
                                    (sum_2, item) =>
                                        (sum_2 +=
                                            (item.children &&
                                                item.children.reduce((sum_3, opt) => {
                                                    return (sum_3 += (opt.children && opt.children.length) || 1);
                                                }, 0)) ||
                                            1),
                                    0
                                )) + (industry_1.children && industry_1.children[0] && industry_1.children[0].children && industry_1.children[0].children.length ? 1 : 0)
                        "
                    >
                        {{ industry_1.name }}
                    </td>
                    <td :rowspan="(industry_1.children && industry_1.children[0] && industry_1.children[0].children && industry_1.children[0].children.length) + 1">
                        {{ industry_1.children && industry_1.children[0] && industry_1.children[0].name }}
                    </td>
                    <!-- <td></td> -->
                </tr>
                <tr v-for="industry_3 in industry_1.children && industry_1.children[0] && industry_1.children[0].children || []">
                    <td>{{ industry_3.name }}</td>
                </tr>
                <template v-for="industry_2 in industry_1.children && industry_1.children.slice(1)">
                    <tr>
                        <!-- <td></td> -->
                        <td :rowspan="industry_2.children && industry_2.children.length || 1">{{ industry_2.name }}</td>
                        <td>{{ industry_2.children && industry_2.children[0] && industry_2.children[0].name }}</td>
                    </tr>
                    <tr v-for="industry_3 in industry_2.children && industry_2.children.slice(1)">
                        <!-- <td></td> -->
                        <!-- <td></td> -->
                        <td>{{ industry_3.name }}</td>
                    </tr>
                </template>
            </template>
        </table>
    </div>
</template>

<script>
import { industry_list } from '../../../resource/finance/industry';
export default {
    data() {
        return {
            industry_list,
        };
    },
};
</script>

<style>
.industry-table tr {
    background: #fff;
}
.industry-table__level-1 {
    font-weight: 500;
    background: #efefef;
}
</style>