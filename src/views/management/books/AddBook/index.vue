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
                  'title',
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
              v-for="index in form.getFieldValue('creators')"
              :key="index"
              style="margin-bottom: 2px"
              :required="index === 0 ? true : false"
              :label="index === 0 ? '责任者' : ''"
            >
              <a-input
                placeholder="责任者名称"
                v-decorator="[
                  `creatorName[${index}]`,
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
                  v-decorator="[
                    `creatorType[${index}]`,
                    { initialValue: 'mian' },
                  ]"
                >
                  <a-select-option value="mian">主要责任者</a-select-option>
                  <a-select-option value="addition">次要责任者</a-select-option>
                </a-select>
                <a-select
                  slot="addonAfter"
                  placeholder="责任者类型"
                  style="width: 80px"
                  v-decorator="[
                    `creatorMethod[${index}]`,
                    { initialValue: '著' },
                  ]"
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
              <a-select v-decorator="['language', { initialValue: 'zh-CN' }]">
                <a-select-option value="zh-CN">汉语</a-select-option>
                <a-select-option value="ja-JP">日语</a-select-option>
                <a-select-option value="en-US">英语</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="24" :sm="24">
            <a-form-item label="分类号">
              <a-input placeholder="请输入分类号" v-decorator="['class']" />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="24" :sm="24">
            <a-form-item label="索书号">
              <a-input placeholder="请输入索书号" v-decorator="['call']" />
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
  title: "书名",
  pub: "出版社",
  isbn: "ISBN",
  creatorName: "责任者",
};
let id = 0;

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
        form.validateFields((err) => {
          if (err) {
            let newError = {},
              no = 0;
            Object.keys(err)
              .filter((key) => err[key])
              .forEach((item) => {
                if (Array.isArray(err[item])) {
                  for (let i of err[item]) {
                    newError[item + `[${no++}]`] = i;
                  }
                } else {
                  newError[item] = err[item];
                }
              });
            if (newError) {
              reject(newError);
              return;
            }
          }
          resolve();
        });
      }).catch(() => {});

      // clean this.errors
      this.errors = [];
      //Promise.all(Form)
      Form.then(() => {
        form.validateFields((err, values) => {
          if (err) {
            let newErrors = {},
              no = 0;
            const errors = Object.assign({}, this.form.getFieldsError());

            Object.keys(errors)
              .filter((key) => errors[key])
              .forEach((item) => {
                if (item == "creatorMethod" || item == "creatorType") return;
                if (Array.isArray(errors[item][0])) {
                  for (let i of errors[item]) {
                    newErrors[item + `[${no++}]`] = i;
                  }
                } else {
                  newErrors[item] = errors[item];
                }
              });
            if (
              Object.keys(newErrors)[0] === "creatorName" &&
              Object.keys(newErrors).length == 1
            ) {
              return;
            }
            const tmp = { ...newErrors };

            this.errorList(tmp);
          } else {
            let {
              creatorType,
              creators,
              creatorName,
              creatorMethod,
              ...result
            } = values;

            result.creator = { main: [], method: "", addition: [] };

            for (let i = 0; i <= values.creatorType.length - 1; i++) {
              console.log(values.creatorName[i]);
              if (values.creatorType[i] == "mian") {
                result.creator.main.push(values.creatorName[i]);
                result.creator.method = values.creatorMethod[i];
              } else {
                result.creator.addition.push({
                  title: values.creatorName[i],
                  method: values.creatorMethod[i],
                });
              }
            }

            this.$http.post("/books/add/", result).then((res) => {
              if (res.msg == "BOOK ADD SUCCESS") {
                $notification.open({
                  message: "书籍添加成功",
                  description: `书籍${result.title}添加成功`,
                  icon: <a-icon type="smile" style="color: #108ee9" />,
                });
              } else {
                $notification.warning({
                  message: "书籍添加失败",
                  description: `书籍${result.title}添加失败,请检查网络连接！`,
                  icon: <a-icon type="smile" style="color: #108ee9" />,
                });
              }
            });
          }
        });
      });
    },
    errorList(errors) {
      if (!errors || errors.length === 0) {
        return;
      }
      this.errors = Object.keys(errors)
        .filter((key) => errors[key])
        .map((key) => {
          return {
            key: key,
            message: errors[key][0],
            fieldLabel: fieldLabels[key] || fieldLabels.creatorName,
          };
        });
    },
    scrollToField(fieldKey) {
      const labelNode = document.getElementById(fieldKey);
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
