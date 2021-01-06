<template>
  <a-modal
    v-model="visible"
    title="图书信息"
    :bordered="false"
    :hideRequiredMark="view"
    width="1040px"
    @ok="validate()"
    @cancel="close()"
  >
    <a-form :form="form" class="form">
      <a-row class="form-row" :gutter="16">
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="书名">
            <a-input
              placeholder="请输入书籍名称"
              :disabled="view"
              v-decorator="[
                'title',
                {
                  rules: [
                    {
                      required: !view,
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
              :disabled="view"
              v-decorator="[
                'pub',
                {
                  rules: [
                    {
                      required: !view,
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
              :disabled="view"
              v-decorator="[
                'isbn',
                {
                  rules: [
                    {
                      required: !view,
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
            :required="index === 0 ? !view : false"
            :label="index === 0 ? '责任者' : ''"
          >
            <a-input
              placeholder="责任者名称"
              :disabled="view"
              v-decorator="[
                `creatorName[${index}]`,
                {
                  rules: [
                    {
                      required: !view,
                      message:
                        index === 0 ? '请输入责任者' : '请输入责任者或删除该项',
                    },
                  ],
                },
              ]"
            >
              <a-select
                slot="addonBefore"
                placeholder="责任者类型"
                :disabled="view"
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
                :disabled="view"
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
          <a-form-item v-if="!view">
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
            <a-select
              :disabled="view"
              v-decorator="['language', { initialValue: 'zh-CN' }]"
            >
              <a-select-option value="zh-CN">汉语</a-select-option>
              <a-select-option value="ja-JP">日语</a-select-option>
              <a-select-option value="en-US">英语</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24" :sm="24">
          <a-form-item label="分类号">
            <a-input
              :disabled="view"
              placeholder="请输入分类号"
              v-decorator="['class']"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24" :sm="24">
          <a-form-item label="索书号">
            <a-input
              :disabled="view"
              placeholder="请输入索书号"
              v-decorator="['call']"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item label="备注">
            <a-input :disabled="view" type="textarea" v-decorator="['note']" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { baseMixin } from "@/store/app-mixin";

const fieldLabels = {
  title: "书名",
  pub: "出版社",
  isbn: "ISBN",
  creatorName: "责任者",
};
let id = 0;

export default {
  name: "BookModal",
  mixins: [baseMixin],

  data() {
    return {
      data: {},
      view: true,
      visible: false,
      loading: false,
      errors: [],
    };
  },
  components: {},
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("creators", {
      initialValue: [],
      preserve: true,
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
      if (this.view) {
        this.close();
        return;
      }
      const { form, $notification } = this;
      const Form = new Promise((resolve, reject) => {
        form.validateFields((err) => {
          if (err) {
            let newError = {},
              i = 0;
            Object.keys(err)
              .filter((key) => err[key])
              .forEach((item) => {
                if (Array.isArray(err[item])) {
                  for (let i of err[item]) {
                    newError[item + `[${i++}]`] = i;
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
              i = 0;
            const errors = Object.assign({}, this.form.getFieldsError());
            Object.keys(errors)
              .filter((key) => errors[key])
              .forEach((item) => {
                if (Array.isArray(errors[item][0])) {
                  for (let i of errors[item]) {
                    newErrors[item + `[${i++}]`] = i;
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
          } else {
            let {
              creatorType,
              creators,
              creatorName,
              creatorMethod,
              ...result
            } = values;
            result.no = this.data.no;
            result.creator = { main: [], method: "", addition: [] };

            for (let i = 0; i <= values.creatorType.length - 1; i++) {
              if (
                values.creatorType[i] == "mian" ||
                values.creatorType[i] == "主要责任者"
              ) {
                result.creator.main.push(values.creatorName[i]);
                result.creator.method = values.creatorMethod[i];
              } else {
                result.creator.addition.push({
                  title: values.creatorName[i],
                  method: values.creatorMethod[i],
                });
              }
            }

            this.$http.post("/books/update/", result).then((res) => {
              if (res.msg == "BOOK UPDATE SUCCESS") {
                $notification.open({
                  message: "书籍更新成功",
                  description: `书籍${result.title}更新成功！`,
                  icon: <a-icon type="check" style="color: #10ee99" />,
                });
              } else {
                $notification.warning({
                  message: "书籍更新失败",
                  description: `书籍${result.title}更新失败,请检查网络连接！`,
                  icon: <a-icon type="exclamation" style="color: #ee1111" />,
                });
              }
            });
          }
          this.close();
          this.$emit("refresh");
        });
      });
    },

    /**
     * 从父组件获取数据填入
     */
    fetch() {
      const { form, data } = this;
      let {
        no,
        pub_years,
        subject,
        creatorMethod,
        creatorName,
        creatorType,
        creator,
        ...bookObject
      } = data;

      form.setFieldsValue(bookObject);
      let i = 0;
      for (; i < data.creator.main.length; i++) {
        if (i >= 0) this.add();
        let main = `{"creatorName[${i}]":"${data.creator.main[i]}","creatorType[${i}]":"主要责任者","creatorMethod[${i}]":"${data.creator.method}"}`;
        this.$nextTick(() => {
          form.setFieldsValue(JSON.parse(main));
        });
      }
      for (let j = 0; j < data.creator.addition.length; j++) {
        if (i >= 0) this.add();
        let addition = `{"creatorName[${i + j}]":"${
          data.creator.addition[j].title
        }","creatorType[${i + j}]":"次要责任者","creatorMethod[${i + j}]":"${
          data.creator.addition[j].method
        }"}`;
        this.$nextTick(() => {
          form.setFieldsValue(JSON.parse(addition));
        });
      }
    },
    /**
     * 传入数据并显示
     */
    edit(data) {
      this.visible = true;
      this.data = data;
      this.view = false;
      this.$nextTick(() => {
        this.fetch();
      });
    },
    show(data) {
      this.visible = true;
      this.data = data;
      this.view = true;
      this.$nextTick(() => {
        this.fetch();
      });
    },

    /**
     * close
     */
    close() {
      this.visible = false;
      id = 0;
      this.view = true;
      this.form.resetFields();
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
