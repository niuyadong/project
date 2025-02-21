<template>
	<div class="base-page-pc page-change-log">
		<div class="header"></div>
		<div class="base-page-pc__container">
			<div class="page-change-log-bg"></div>
			<div class="page-change-log-header">
				<p class="page-change-log-header__title">
					{{ "更新日志" }}
				</p>
				<p class="page-change-log-header__date">
					{{ "最近更新时间为 " + updateTime }}
				</p>
			</div>
			<div class="page-change-log-content">
				<div v-for="(item, index) in pageContent" :key="index">
					<div class="change-log-pc-detail">
						<div class="change-log-pc-detail-heading">
							<span class="change-log-pc-detail-heading__icon"
								><a-icon type="profile"
							/></span>
							<h1 class="change-log-pc-detail-heading__title" :id="item.name">
								<strong>{{ item.name }}</strong>
							</h1>
							<h1 class="change-log-pc-detail-heading__day">
								<strong>{{ getDayOfWeek(item.date) }}</strong>
							</h1>
						</div>
						<div class="change-log-pc-detail-author">
							<span class="change-log-pc-detail-author__name"
								><a-icon type="user" style="font-size: 16px" />{{
									" " + item.author
								}}</span
							>
							<span class="change-log-pc-detail-author__date">
								{{ "发布于" + " " + item.date }}
							</span>
						</div>
						<div
							class="change-log-pc-detail-content"
							v-html="item.content"
						></div>
					</div>
					<div class="change-log-pc-detail-control">
						<div class="change-log-pc-detail-control-btn">
							<a-icon class="btn-icon" style="margin-right: 10px" type="edit" />
							<a-icon class="btn-icon" type="delete" />
						</div>
					</div>
				</div>
				<div class="load-more" v-if="!isLoading">{{ "加载更多" }}</div>
				<div class="load-more" v-else>
					<a-icon type="loading" />{{ " 加载中..." }}
				</div>
				<div class="page-change-log-content__menu-container">
					<div class="page-change-log-menu__list">
						<a-anchor
							:affix="false"
							:target="() => document.querySelector('.page-change-log')"
							:offsetTop="200"
						>
							<template v-for="(temp, p) in pageContent">
								<a-anchor-link
									:key="p"
									:href="`#${temp.name}`"
									:title="temp.name"
									class="change-log-pc-menu__heading"
								/>
							</template>
						</a-anchor>
					</div>
				</div>
			</div>
			<a-back-top />
		</div>
		<rich-text-editor v-model="content" v-if="false" />
	</div>
</template>

<script>
import pageData from "./js/pageData.json";
import RichTextEditor from "@/components/richTextEditor";

export default {
	components: { RichTextEditor },
	data() {
		return {
			pageContent: pageData.slice(0, 20), // 初始加载20条数据
			content: "<p>初始内容</p>",
			updateTime: "2021-09-01",
			isLoading: false,
			loadedCount: 20, // 已加载的数据条数
		};
	},
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		handleScroll() {
			const scrollTop =
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop;
			const windowHeight = window.innerHeight;
			const documentHeight =
				document.documentElement.scrollHeight || document.body.scrollHeight;

			if (scrollTop + windowHeight >= documentHeight - 100 && !this.isLoading) {
				// 100 是一个缓冲区，可以根据需要调整
				this.loadMore();
			}
		},
		loadMore() {
			this.isLoading = true;
			setTimeout(() => {
				const newItems = pageData.slice(
					this.loadedCount,
					this.loadedCount + 20,
				); // 每次加载20条数据
				this.pageContent = this.pageContent.concat(newItems);
				this.loadedCount += 20;
				this.isLoading = false;
			}, 1000);
		},
		getDayOfWeek(dateString) {
			const daysOfWeek = [
				"星期日",
				"星期一",
				"星期二",
				"星期三",
				"星期四",
				"星期五",
				"星期六",
			];
			const date = new Date(dateString);
			return daysOfWeek[date.getDay()];
		},
	},
};
</script>
<style scoped lang="less">
h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin: 0;
	padding: 0;
}

.page-change-log {
	height: 100%;
	background: #f6f6f7;

	.base-page-pc__container {
		width: 720px;
		margin: auto;

		.page-change-log-bg {
			position: absolute;
			width: 100%;
			height: 320px;
			background: linear-gradient(#9ec4ff, transparent);
			top: 0;
			left: 0;
		}

		.page-change-log-header {
			font-weight: 600;
			font-size: 36px;
			line-height: 44px;
			text-align: center;
			padding-top: 46px;
			position: relative;

			.page-change-log-header__date {
				font-size: 18px;
				line-height: 26px;
				margin: 16px 0 43px;
				color: rgba(0, 0, 0, 0.6);
			}
		}

		.page-change-log-content {
			background-color: #fff;
			border-radius: 6px;
			padding: 24px;
			position: relative;

			.page-change-log-content__menu-container {
				height: 100%;
				position: absolute;
				width: 200px;
				left: 0;
				top: 0;
				transform: translateX(calc(-100% - 12px));

				.page-change-log-menu__list {
					background-color: #fff;
					border-radius: 6px;
					width: 100%;
					padding: 8px;
					box-sizing: border-box;
					font-weight: 600;
					font-size: 14px;
					line-height: 22px;
					position: sticky;
					top: 0;
					// max-height: 500px;
					// overflow: auto;

					.change-log-pc-menu__heading {
						font-size: 16px;
						color: rgba(0, 0, 0, 0.4);
						padding: 10px 8px 10px 16px;
						border-radius: 6px;
						cursor: pointer;
						margin-top: 6px;
					}
				}
			}

			.change-log-pc-detail {
				position: relative;

				.change-log-pc-detail-heading {
					height: 28px;
					display: flex;
					align-items: center;
					font-weight: 600;
					margin-bottom: 8px;

					.change-log-pc-detail-heading__icon {
						font-size: 16px;
					}

					.change-log-pc-detail-heading__title {
						font-size: 20px;
						margin-left: 10px;
						line-height: 28px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.change-log-pc-detail-heading__day {
						font-size: 18px;
						margin-left: 10px;
						line-height: 28px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.change-log-pc-detail-author {
					margin-bottom: 20px;
					height: 24px;
					display: flex;
					align-items: center;

					.change-log-pc-detail-author__date {
						font-weight: 400;
						font-size: 14px;
						color: rgba(0, 0, 0, 0.4);
						margin-left: 8px;
					}
				}

				.change-log-pc-detail-item {
					margin-bottom: 20px;
				}
			}

			.change-log-pc-detail-control {
				margin-top: 20px;
				height: 28px;
				display: flex;
				align-items: center;
				color: #5a6d96;
				position: relative;

				.change-log-pc-detail-control-btn {
					font-size: 16px;
					margin-left: auto;

					.btn-icon:hover {
						color: #1088e9;
						cursor: pointer;
					}
				}
			}
		}
	}
	.load-more {
		display: block;
		text-align: center;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		font-size: 0.28rem;
	}
	@media (min-width: 750px) {
		.load-more {
			padding-top: 10px;
			padding-bottom: 10px;
			font-size: 12px;
		}
	}
	.ant-anchor-wrapper {
		max-height: calc(-800px + 100vh) !important;
	}
}
</style>
