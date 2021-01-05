<template>
  <page-header-wrapper>
    <a-card class="card" title="基本信息" :bordered="false">
      <a-form :form="form" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="书名">
              <a-input
                placeholder="请输入书籍名称"
                v-decorator="[
                  'name',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入书籍名称',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="出版社">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'pub',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入出版社名',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="ISBN">
              <a-input
                placeholder="请输入ISBN码"
                v-decorator="[
                  'isbn',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入ISBN码',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="16">
          <a-col :lg="16" :md="24" :sm="24">
            <a-form-item
              v-for="(k, index) in form.getFieldValue('creators')"
              :key="k"
              style="margin-bottom: 2px"
              :required="index === 0 ? true : false"
              :label="index === 0 ? '责任者' : ''"
            >
              <a-input
                placeholder="责任者名称"
                v-decorator="[
                  `creatorName[${k}]`,
                  {
                    rules: [
                      {
                        required: true,
                        message:
                          index === 0
                            ? '请输入责任者'
                            : '请输入责任者或删除该项',
                      },
                    ],
                  },
                ]"
              >
                <a-select
                  slot="addonBefore"
                  placeholder="责任者类型"
                  default-value="mian"
                >
                  <a-select-option value="mian">主要责任者</a-select-option>
                  <a-select-option value="addition">次要责任者</a-select-option>
                </a-select>
                <a-select
                  slot="addonAfter"
                  placeholder="责任者类型"
                  default-value="著"
                  style="width: 80px"
                >
                  <a-select-option value="著">著</a-select-option>
                  <a-select-option value="编著">编著</a-select-option>
                  <a-select-option value="译">译</a-select-option>
                  <a-select-option value="编译">编译</a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button-group style="width: 100%">
                <a-button type="dashed" style="width: 65%" @click="add">
                  <a-icon type="plus" /> 添加责任者
                </a-button>
                <a-button
                  type="dashed"
                  style="width: 35%"
                  @click="remove()"
                  :disabled="form.getFieldValue('creators').length === 1"
                >
                  <a-icon type="delete" /> 删除责任者
                </a-button>
              </a-button-group>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="24" :sm="24">
            <a-form-item label="语言">
              <a-select default-value="zh-CN">
                <a-select-option value="zh-CN">汉语</a-select-option>
                <a-select-option value="ja-JP">日语</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="备注">
              <a-input type="textarea" v-decorator="['note']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <!-- fixed footer toolbar -->
    <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
      <span class="popover-wrapper">
        <a-popover
          title="校验信息"
          overlayClassName="antd-pro-pages-forms-style-errorPopover"
          trigger="click"
          :getPopupContainer="(trigger) => trigger.parentNode"
        >
          <template slot="content">
            <li
              v-for="item in errors"
              :key="item.key"
              @click="scrollToField(item.key)"
              class="antd-pro-pages-forms-style-errorListItem"
            >
              <a-icon
                type="cross-circle-o"
                class="antd-pro-pages-forms-style-errorIcon"
              />
              <div class="">{{ item.message }}</div>
              <div class="antd-pro-pages-forms-style-errorField">
                {{ item.fieldLabel }}
              </div>
            </li>
          </template>
          <span
            class="antd-pro-pages-forms-style-errorIcon"
            v-if="errors.length > 0"
          >
            <a-icon type="exclamation-circle" />{{ errors.length }}
          </span>
        </a-popover>
      </span>
      <a-button type="primary" @click="validate" :loading="loading">
        <span>提交</span>
      </a-button>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from "@/components/FooterToolbar";
import { baseMixin } from "@/store/app-mixin";

const fieldLabels = {
  name: "书名",
  pub: "出版社",
  isbn: "ISBN",
  creatorName: "责任者",
};
let id = 0;
/* const langLabels = {
  "zh-CN": "汉语",
  "ja-JP": "日语",
}; */
export default {
  name: "BookAddForm",
  mixins: [baseMixin],
  data() {
    return {
      loading: false,
      errors: [],
    };
  },
  components: { FooterToolBar },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("creators", {
      initialValue: [],
      preserve: true,
    });
    const creators = this.form.getFieldValue("creators");
    this.form.setFieldsValue({
      creators: creators.concat(id++),
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
    },
    remove() {
      const { form } = this;
      const creators = form.getFieldValue("creators");
      if (creators.length === 1) {
        return;
      }

      form.setFieldsValue({
        creators: creators.filter(
          (key) => key !== creators[creators.length - 1]
        ),
      });
    },

    add() {
      const { form } = this;
      const creators = form.getFieldValue("creators");
      const nextCreators = creators.concat(id++);
      form.setFieldsValue({
        creators: nextCreators,
      });
    },
    /*
     *处理提交部分
     */
    validate() {
      const { form, $notification } = this;
      const Form = new Promise((resolve, reject) => {
        form.validateFields((err, values) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(values);
        });
      }).catch(() => {});

      // clean this.errors
      this.errors = [];
      Promise.all(Form)
        .then((values) => {
          $notification["error"]({
            message: "Received values of form:",
            description: JSON.stringify(values),
          });
        })
        .catch(() => {
          const errors = Object.assign({}, this.form.getFieldsError());
          const tmp = { ...errors };
          this.errorList(tmp);
        });
    },
    errorList(errors) {
      if (!errors || errors.length === 0) {
        return;
      }
      this.errors = [];
      Object.keys(errors)
        .filter((key) => errors[key])
        .forEach((key) => {
          let id = 0;
          if (key == "creatorName") {
            for (let i of errors[key]) {
              this.errors.push({
                key: key + `[${id++}]`,
                message: i[0],
                fieldLabel: fieldLabels[key],
              });
            }
          } else {
            this.errors.push({
              key: key,
              message: errors[key][0],
              fieldLabel: fieldLabels[key],
            });
          }
        });
    },
    scrollToField(fieldKey) {
      console.log(fieldKey);
      const labelNode = document.getElementById(fieldKey);
      /* const labelNode = document.querySelector(`label[for="${fieldKey}"]`); */
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
.popover-wrapper {
  /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
    min-width: 256px;
    max-height: 290px;
    padding: 0;
    overflow: auto;
  }
}
.antd-pro-pages-forms-style-errorIcon {
  user-select: none;
  margin-right: 24px;
  color: #f5222d;
  cursor: pointer;
  i {
    margin-right: 4px;
  }
}
.antd-pro-pages-forms-style-errorListItem {
  padding: 8px 16px;
  list-style: none;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #e6f7ff;
  }
  .antd-pro-pages-forms-style-errorIcon {
    float: left;
    margin-top: 4px;
    margin-right: 12px;
    padding-bottom: 22px;
    color: #f5222d;
  }
  .antd-pro-pages-forms-style-errorField {
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
}
</style>
