<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
        <chart-card
          :loading="loading"
          title="访问量"
          :total="8846 | NumberFormat"
        >
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <template slot="footer"
            >日访问量<span> {{ "1234" | NumberFormat }}</span></template
          >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
        <chart-card
          :loading="loading"
          title="借阅量"
          :total="560 | NumberFormat"
        >
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <template slot="footer">预约借阅比 <span>50%</span></template>
        </chart-card>
      </a-col>
    </a-row>

    <div
      class="antd-pro-pages-dashboard-analysis-twoColLayout"
      :class="!isMobile && 'desktop'"
    >
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            :loading="loading"
            :bordered="false"
            title="线上热门搜索"
            :style="{ height: '100%' }"
          >
            <a-dropdown
              :trigger="['click']"
              placement="bottomLeft"
              slot="extra"
            >
              <a class="ant-dropdown-link" href="#">
                <a-icon type="ellipsis" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">操作一</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">操作二</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <a-row :gutter="68">
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px' }">
                <number-info :total="12321" :sub-total="17.1">
                  <span slot="subtitle">
                    <span>搜索用户数</span>
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon
                        type="info-circle-o"
                        :style="{ marginLeft: '8px' }"
                      />
                    </a-tooltip>
                  </span>
                </number-info>
                <!-- miniChart -->
                <div>
                  <mini-smooth-area
                    :style="{ height: '45px' }"
                    :dataSource="searchUserData"
                    :scale="searchUserScale"
                  />
                </div>
              </a-col>
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px' }">
                <number-info :total="2.7" :sub-total="26.2" status="down">
                  <span slot="subtitle">
                    <span>人均搜索次数</span>
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon
                        type="info-circle-o"
                        :style="{ marginLeft: '8px' }"
                      />
                    </a-tooltip>
                  </span>
                </number-info>
                <!-- miniChart -->
                <div>
                  <mini-smooth-area
                    :style="{ height: '45px' }"
                    :dataSource="searchUserData"
                    :scale="searchUserScale"
                  />
                </div>
              </a-col>
            </a-row>
            <div class="ant-table-wrapper">
              <a-table
                row-key="index"
                size="small"
                :columns="searchTableColumns"
                :dataSource="searchData"
                :pagination="{ pageSize: 5 }"
              >
                <span slot="range" slot-scope="text, record">
                  <trend :flag="record.status === 0 ? 'up' : 'down'">
                    {{ text }}%
                  </trend>
                </span>
              </a-table>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="antd-pro-pages-dashboard-analysis-salesCard"
            :loading="loading"
            :bordered="false"
            title="书籍借阅类别占比"
            :style="{ height: '100%' }"
          >
            <h4>借阅量</h4>
            <div>
              <!-- style="width: calc(100% - 240px);" -->
              <div>
                <v-chart
                  :force-fit="true"
                  :height="405"
                  :data="pieData"
                  :scale="pieScale"
                >
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <!-- position="right" :offsetX="-140" -->
                  <v-legend dataKey="item" />
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  ChartCard,
  MiniArea,
  MiniBar,
  Trend,
  NumberInfo,
  MiniSmoothArea,
} from "@/components";
import { baseMixin } from "@/store/app-mixin";

const barData = [];
const barData2 = [];
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const searchUserData = [];
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment().add(i, "days").format("YYYY-MM-DD"),
    y: Math.ceil(Math.random() * 10),
  });
}
const searchUserScale = [
  {
    dataKey: "x",
    alias: "时间",
  },
  {
    dataKey: "y",
    alias: "用户数",
    min: 0,
    max: 10,
  },
];

const searchTableColumns = [
  {
    dataIndex: "index",
    title: "排名",
    width: 90,
  },
  {
    dataIndex: "keyword",
    title: "搜索关键词",
  },
  {
    dataIndex: "count",
    title: "用户数",
  },
  {
    dataIndex: "range",
    title: "周涨幅",
    align: "right",
    sorter: (a, b) => a.range - b.range,
    scopedSlots: { customRender: "range" },
  },
];
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}

const DataSet = require("@antv/data-set");

const sourceData = [
  { item: "经典著作", count: 27.2 },
  { item: "计算机技术", count: 21 },
  { item: "自然科学", count: 17 },
  { item: "中国文学", count: 13 },
  { item: "外国文学", count: 10 },
  { item: "历史地理", count: 6 },
  { item: "教材", count: 5.8 },
];

const pieScale = [
  {
    dataKey: "percent",
    min: 0,
    formatter: ".0%",
  },
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: "percent",
  field: "count",
  dimension: "item",
  as: "percent",
});
const pieData = dv.rows;

export default {
  name: "Analysis",
  mixins: [baseMixin],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,

    Trend,
    NumberInfo,
    MiniSmoothArea,
  },
  data() {
    return {
      loading: true,

      // 搜索用户数
      searchUserData,
      searchUserScale,
      searchTableColumns,
      searchData,

      barData,
      barData2,

      //
      pieScale,
      pieData,
      sourceData,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1,
      },
    };
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading;
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
</style>
