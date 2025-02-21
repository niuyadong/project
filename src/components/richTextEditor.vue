<template>
	<div class="quill-editor-wrapper">
		<quill-editor
			ref="myQuillEditor"
			v-model="content"
			:options="mergedOptions"
			@change="onEditorChange"
		/>
		<input
			type="file"
			ref="fileInput"
			:accept="uploadConfig.acceptedFiles"
			style="display: none"
			@change="handleFileUpload"
		/>
	</div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

export default {
	name: "RichTextEditor",
	components: { quillEditor },
	props: {
		value: {
			type: String,
			default: "",
		},
		options: {
			type: Object,
			default: () => ({}),
		},
		uploadConfig: {
			type: Object,
			default: () => ({
				action: "/api/upload", // 上传接口
				headers: {}, // 自定义请求头
				maxSize: 10 * 1024 * 1024, // 10MB
				acceptedFiles: "image/*, video/*",
				fieldName: "file", // 上传字段名
			}),
		},
	},
	data() {
		return {
			content: this.value,
			defaultOptions: {
				modules: {
					toolbar: [
						["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
						["blockquote", "code-block"], //引用，代码块
						[{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
						[{ list: "ordered" }, { list: "bullet" }], //列表
						[{ script: "sub" }, { script: "super" }], // 上下标
						// [{ indent: "-1" }, { indent: "+1" }], // 缩进
						// [{ direction: "rtl" }], // 文本方向
						// [{ size: ["small", false, "large", "huge"] }], // 字体大小
						[{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
						[{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
						// [{ font: [] }], //字体
						[{ align: [] }], //对齐方式
						["clean"], //清除字体样式
						// ["image", "video"], //上传图片、上传视频
					],
					history: {
						delay: 1000,
						maxStack: 50,
						userOnly: false,
					},
				},
				theme: "snow",
				placeholder: "请输入内容...",
				readOnly: false,
				bounds: document.body,
				scrollingContainer: null,
				formats: [
					"header",
					"bold",
					"italic",
					"underline",
					"strike",
					"code-block",
					"color",
					"font",
					"align",
					"blockquote",
					"list",
					"bullet",
					"link",
					"image",
					"video",
					"background", // 新增关键项
					"script"
				],
			},
		};
	},
	computed: {
		mergedOptions() {
			const options = { ...this.defaultOptions, ...this.options };
			if (this.options.modules) {
				options.modules = {
					...this.defaultOptions.modules,
					...this.options.modules,
					toolbar:
						this.options.modules?.toolbar ||
						this.defaultOptions.modules.toolbar,
				};
			}
			return options;
		},
	},
	watch: {
		value(newVal) {
			if (newVal !== this.content) {
				this.content = newVal;
			}
		},
	},
	mounted() {
		this.initCustomUpload();
	},
	methods: {
		initCustomUpload() {
			const toolbar = this.$refs.myQuillEditor.quill.getModule("toolbar");
			toolbar.addHandler("image", this.handleImageUpload);
			toolbar.addHandler("video", this.handleVideoUpload);
		},

		handleImageUpload() {
			this.$refs.fileInput.click();
		},

		handleVideoUpload() {
			this.$refs.fileInput.click();
		},

		async handleFileUpload(e) {
			const file = e.target.files[0];
			if (!file) return;

			// 验证文件
			if (file.size > this.uploadConfig.maxSize) {
				this.$message.error(
					`文件大小不能超过 ${this.uploadConfig.maxSize / 1024 / 1024}MB`,
				);
				return;
			}

			try {
				const formData = new FormData();
				formData.append(this.uploadConfig.fieldName, file);

				const response = await this.$http.post(
					this.uploadConfig.action,
					formData,
					{
						headers: this.uploadConfig.headers,
					},
				);

				const range = this.$refs.myQuillEditor.quill.getSelection(true);
				const isImage = file.type.startsWith("image/");

				if (isImage) {
					this.$refs.myQuillEditor.quill.insertEmbed(
						range.index,
						"image",
						response.data.url,
					);
				} else {
					this.$refs.myQuillEditor.quill.insertEmbed(
						range.index,
						"video",
						response.data.url,
					);
				}

				this.$refs.myQuillEditor.quill.setSelection(range.index + 1);
			} catch (error) {
				this.$message.error("文件上传失败");
			} finally {
				this.$refs.fileInput.value = null;
			}
		},

		onEditorChange({ html }) {
			this.$emit("input", html);
		},
	},
	beforeDestroy() {
		if (this.$refs.myQuillEditor?.quill) {
			this.$refs.myQuillEditor.quill = null;
		}
	},
};
</script>
<style>
.ql-align-center {
	text-align: center;
}
.ql-align-right {
	text-align: right;
}
.ql-align-justify {
	display: flex;
}
.ql-align-left {
	text-align: left;
}
</style>
