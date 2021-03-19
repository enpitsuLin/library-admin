<template>
  <a-modal
    title="修改头像"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="800"
    :footer="null"
    @cancel="cancelHandel"
  >
    <a-row>
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </a-col>
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :outputType="options.outputType"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col :xs="8" :md="6">
        <a-upload
          name="file"
          :beforeUpload="beforeUpload"
          :showUploadList="false"
        >
          <a-button icon="upload">选择图片</a-button>
        </a-upload>
      </a-col>

      <a-col :xs="12" :md="6">
        <a-button-group>
          <a-button icon="plus" @click="changeScale(1)" />
          <a-button icon="minus" @click="changeScale(-1)" />
          <a-button icon="undo" @click="rotateLeft" />
          <a-button icon="redo" @click="rotateRight" />
        </a-button-group>
      </a-col>
      <a-col :xs="4" :md="{ span: '2', offset: '10' }"
        ><a-button type="primary" @click="finish('blob')">保存</a-button></a-col
      >
    </a-row>
  </a-modal>
</template>
<script>
import { UploadAvatar, UploadAvatarAdmin } from "@/api/Account";
export default {
  data() {
    return {
      visible: false,
      id: null,
      confirmLoading: false,
      fileList: [],
      uploading: false,
      options: {
        img: "",
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        outputType: "jpeg",
        fixedBox: true,
      },
      previews: {},
    };
  },
  methods: {
    edit(id) {
      this.visible = true;
      this.id = id;
      /* 获取原始头像 */
    },
    close() {
      this.id = null;
      this.visible = false;
    },
    cancelHandel() {
      this.close();
    },
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    beforeUpload(file) {
      const reader = new FileReader();
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.options.img = reader.result;
      };
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false;
    },

    // 上传图片（点击上传按钮）
    finish(type) {
      const _this = this;
      const formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          const img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;

          formData.append("file", data, this.fileName);
          this.$http
            .post("/users/uploadavatar", formData, {
              contentType: false,
              processData: false,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              let res = response.result;
              if (res.status === "done") {
                _this.$message.success("上传成功");
                _this.$emit("ok", res.url);
                _this.visible = false;
                _this.options.img = "";
              }
            });
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    okHandel() {
      const vm = this;

      vm.confirmLoading = true;
      setTimeout(() => {
        vm.confirmLoading = false;
        vm.close();
        vm.$message.success("上传头像成功");
      }, 2000);
    },

    realTime(data) {
      this.previews = data;
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
