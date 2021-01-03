<template>
  <a-modal :visible="visible" title="新增图书" @cancel="visible = false">
    <a-form layout="vertical" :form="form">
      <a-form-item label="书名">
        <a-input
          v-decorator="[
            'title',
            {
              rules: [
                {
                  required: true,
                  message: '请输入书名!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="责任者">
        <a-input-group
          compact
          v-for="(k, index) in form.getFieldValue('creators')"
          :key="k"
          style="margin-bottom: 2px"
          :required="index === 0 ? true : false"
        >
          <a-select
            style="width: 35%"
            placeholder="责任者类型"
            default-value="0"
          >
            <a-select-option value="0">主要责任者</a-select-option>
            <a-select-option value="1">额外个人责任者</a-select-option>
            <a-select-option value="2">额外团体责任者</a-select-option>
          </a-select>
          <a-input style="width: 65%" placeholder="名称" />
        </a-input-group>
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
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
      <a-form-item label="出版社">
        <a-input
          v-decorator="[
            'publish',
            {
              rules: [
                {
                  required: true,
                  message: '请输入出版社!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="ISBN">
        <a-input
          v-decorator="[
            'isbn',
            {
              rules: [
                {
                  required: true,
                  message: '请输入isbn!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="备注">
        <a-input type="textarea" v-decorator="['note']" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
let id = 1;
export default {
  data() {
    return {
      visible: false,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 24 },
        },
      },
    };
  },
  methods: {
    show() {
      this.visible = true;
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
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "new_book" });
    this.form.getFieldDecorator("creators", {
      initialValue: [],
      preserve: true,
    });
    const creators = this.form.getFieldValue("creators");
    this.form.setFieldsValue({
        creators: creators.concat(id++),
      });
  },
};
</script>

<style>
</style>