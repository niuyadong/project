<template>
	<div class="pandle-box">
		<div class="pandle-box-right">
			<div class="pandle-box-right-btn">
				<a-button type="primary" class="btn-mg" @click="addSchedule"
					><a-icon type="plus" />添加日程</a-button
				>
			</div>
			<!-- 自定义头部，面板日期切换 -->
			<div class="pandle-box-right-serach">
				<div class="calendar-header-box">
					<a-select
						mode="multiple"
						v-model="timeType"
						style="max-width: 220px; min-width: 160px"
						placeholder="请选择筛选类型"
						allowClear
						showArrow
					>
						<a-select-option :value="1">{{ "时间区间" }}</a-select-option>
						<a-select-option :value="2">{{ "时间点" }}</a-select-option>
					</a-select>
				</div>
				<div class="calendar-header-box calendar-header">
					<ul>
						<template v-for="(temp, index) in schedule_typeList"
							><li :key="index" @click="handleChangeScheduleType(temp)">
								<i
									class="calendar-header-box-icon"
									:style="{
										backgroundColor: getColorByScheduleType(temp.value),
									}"
								></i
								><span :class="temp.isSelected ? 'actived' : 'disabled'">{{
									temp.label
								}}</span>
							</li></template
						>
					</ul>
				</div>
				<div class="calendar-header-box">
					<div class="calendar-header-box-picker">
						<!-- 只选择年份 -->
						<a-date-picker
							v-show="currentType == 'year'"
							class="calendar-header-box-picker-year"
							placeholder="请选择年份"
							v-model="currentYear"
							format="YYYY"
							@change="onYearChange"
							:allowClear="false"
						/>
						<!-- 选择月份 -->
						<a-month-picker
							v-show="currentType == 'month'"
							class="calendar-header-box-picker-month"
							placeholder="请选择月份"
							:value="currentMonth"
							@change="onMonthChange"
							:allowClear="false"
						/>
					</div>
					<a-radio-group
						v-model="currentType"
						class="btn-mg"
						@change="toggleCurrentType"
					>
						<a-radio-button value="month">月</a-radio-button>
						<a-radio-button value="year">年</a-radio-button>
					</a-radio-group>
					<a-button class="btn-mg" @click="setCurrentTime">今天</a-button>
				</div>
			</div>
			<div class="CalendarBox" ref="CalendarBox">
				<FullCalendar
					:options="calendarOptions"
					ref="calendarRef"
					class="eventDeal-wrap"
					id="calendarRef"
				>
					<!-- 日程单元格显示自定义 -->
					<template v-slot:eventContent="arg">
						<!-- 鼠标悬浮日程单元格显示日程信息 -->
						<a-popover
							trigger="hover"
							:visible="eventStates[arg.event.id].hovered"
							@visibleChange="(e) => handleHoverChange(e, arg.event.id)"
						>
							<template #content>
								<p>名称：{{ arg.event.title }}</p>
								<p>
									时间：{{ arg.event.extendedProps.start }} -
									{{ arg.event.extendedProps.end_time }}
								</p>
								<p>主要内容：{{ arg.event.extendedProps.remark }}</p>
							</template>
							<!-- allDay 是否是全天 -->
							<a-popover
								trigger="click"
								:visible="eventStates[arg.event.id].clicked"
								@visibleChange="(e) => handleClickChange(e, arg.event.id)"
							>
								<template #title>
									<div class="popover-title">
										<a-icon
											class="popover-title-icon"
											type="edit"
											@click="editSchedule(arg.event)"
										/>
										<a-icon
											type="delete"
											@click="deleteSchedule(arg.event.id)"
										/>
									</div>
								</template>
								<template #content>
									<div class="popover-content">
										<ul>
											<li class="popover-content-li">
												<span>{{
													"日程类型：" + arg.event.extendedProps.schedule_type
												}}</span>
											</li>
											<li class="popover-content-li">
												<span>{{
													arg.event.extendedProps.schedule_dateType == 1
														? "日程范围：" +  arg.event.extendedProps.start + "-" + arg.event.extendedProps.end_time : "日程范围：" + arg.event.extendedProps.start
												}}</span>
											</li>
											<li class="popover-content-li">
												<span>{{ "日程名称：" + arg.event.title }}</span>
											</li>
											<li class="popover-content-li">
												<span>{{
													"主要内容：" + arg.event.extendedProps.remark
												}}</span>
											</li>
										</ul>
									</div>
								</template>
								<template v-if="arg.event.allDay">
									<!-- 自定义全天--日程展示样式 -->
									<div
										class="CalendarItem"
										:style="[{ background: arg.event.backgroundColor }]"
									>
										<span
											class="calendar-dot"
											:style="[{ background: arg.event.textColor }]"
										></span>
										<div
											class="calendar-label"
											:style="[
												{
													'background-color':
														arg.event.extendedProps.calendarColor,
												},
											]"
										></div>
										<div
											class="fc-event-title fc-sticky"
											:style="[
												{ color: arg.event.textColor },
												{ 'font-weight': 700 },
											]"
										>
											{{ arg.event.title }}
										</div>
									</div>
								</template>
								<template v-else>
									<div
										v-if="currentType == 'month'"
										style="width: 100%; align-items: center; display: flex"
									>
										<div
											class="fc-daygrid-event-dot"
											:style="[
												{
													'border-color': arg.event.extendedProps.schcolor
														? arg.event.extendedProps.schcolor
														: arg.event.extendedProps.calendarColor,
												},
												{ display: 'inline-block' },
											]"
										></div>
										<span class="tree_span_text fc-event-time"
											>{{ arg.timeText }}
										</span>
										<span
											:style="[{ 'font-weight': 700 }]"
											class="fc-event-title"
											>{{ arg.event.title }}</span
										>
									</div>
									<template v-if="currentType == 'week'">
										<span
											:style="[{ 'font-weight': 700 }]"
											class="fc-event-title"
											>{{ arg.event.title }}</span
										>
										<span class="tree_span_text fc-event-time"
											>{{ arg.timeText }}
										</span>
									</template>
								</template>
							</a-popover>
						</a-popover>
					</template>
				</FullCalendar>
			</div>
		</div>
		<a-modal v-model="modalVisible" :title="modalTitle" centered :footer="null">
			<a-form-model
				ref="ruleForm"
				:model="form"
				:rules="rules"
				:label-col="labelCol"
				:wrapper-col="wrapperCol"
			>
				<a-form-model-item label="日程类型" prop="schedule_type">
					<a-select v-model="form.schedule_type" placeholder="请选择日程类型">
						<a-select-option
							v-for="(item, index) in schedule_typeList"
							:value="item.value"
							:key="index"
						>
							{{ item.label }}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item
					label="日程范围"
					:prop="isTimeRange ? 'timeRange' : 'date'"
					:ref="isTimeRange ? 'timeRange' : 'date'"
				>
					<a-select
						v-model="form.schedule_dateType"
						placeholder="请选择日程范围类型"
						@change="handleDateTypeChange"
					>
						<a-select-option :value="1"> 时间区间 </a-select-option>
						<a-select-option :value="2"> 时间点 </a-select-option>
					</a-select>

					<template v-if="isTimeRange">
						<a-range-picker
							v-model="form.timeRange"
							:format="dateFormat"
							@change="handleTimeRangeChange"
						/>
					</template>

					<template v-else>
						<a-date-picker
							v-model="form.date"
							type="date"
							placeholder="请选择时间点"
							style="width: 100%"
							@change="handleDateChange"
						/>
					</template>
				</a-form-model-item>
				<a-form-model-item
					ref="schedule_title"
					label="日程名称"
					prop="schedule_title"
				>
					<a-input
						v-model="form.schedule_title"
						@blur="
							() => {
								if ($refs.schedule_title) {
									$refs.schedule_title.onFieldBlur();
								}
							}
						"
						:maxLength="50"
					/>
				</a-form-model-item>
				<a-form-model-item label="主要内容" prop="schedule_content">
					<a-input
						v-model="form.schedule_content"
						type="textarea"
						:maxLength="300"
					/>
				</a-form-model-item>
				<a-form-model-item :wrapper-col="{ span: 14, offset: 16 }">
					<a-button type="primary" @click="onSubmit"> 保存 </a-button>
					<a-button style="margin-left: 10px" @click="resetForm">
						取消
					</a-button>
				</a-form-model-item>
			</a-form-model>
		</a-modal>
	</div>
</template>

<script>
import moment from "moment";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid"; //日历格子显示
import interactionPlugin from "@fullcalendar/interaction"; //交互
import timeGridPlugin from "@fullcalendar/timegrid"; //日历时间轴显示
import multiMonthPlugin from "@fullcalendar/multimonth";
export default {
	components: {
		FullCalendar,
	},
	data() {
		return {
			mode: "year",
			form: {
				schedule_type: undefined,
				schedule_title: undefined,
				schedule_dateType: 1,
				schedule_content: undefined,
				start_time: "",
				end_time: "",
				timeRange: null,
				date: null,
			},
			timeType: undefined,
			dateFormat: "YYYY/MM/DD",
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
			searchValue: "",
			modalVisible: false,
			modalTitle: "添加日程",
			// currentTimeShow: this.currentTime,
			currentType: "month",
			calendarApi: undefined,
			currentTime: moment(new Date()).format("YYYY-MM-DD"),
			calendarOptions: {
				//日历配置
				plugins: [
					dayGridPlugin,
					timeGridPlugin,
					interactionPlugin,
					multiMonthPlugin,
				],
				initialView: "dayGridMonth", // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
				views: {
					multiMonthFourMonth: {
						type: "multiMonth",
						duration: { months: 4 },
					},
				},
				headerToolbar: false,
				firstDay: "1", // 设置一周中显示的第一天是周几，周日是0，周一是1，以此类推
				// locales: [zhLocale],
				handleWindowResize: true,
				locale: "zh-cn", //切换语言，当前为中文
				allDaySlot: true, // 显示all-day
				weekNumberCalculation: "ISO", // 与firstDay配套使用
				eventCOlor: "#3d8eec", // 全部日历日程背景色timeGridEventMinHeight: '20', // 设置事件的最小高度
				// slotEventOverlap: false, // 相同时间段的多个日程视觉上是否允许重叠，默认true允许
				aspectRatio: "2", // 设置日历单元格宽高比
				height: "100%",
				fixedWeekCount: false,
				// displayEventTime: false, // 是否显示事件时间
				// allDaySlot: false, // 周、日视图时，all-day不显示
				events: [], // 日程数组
				eventTimeFormat: {
					// like '14:30:00'
					hour: "2-digit",
					minute: "2-digit",
					meridiem: false,
					hour12: false,
				},
				// 事件
				editable: false, // 是否可以进行（拖动、缩放）修改
				// eventStartEditable: true, // Event日程开始时间可以改变，默认为true，若为false,则表示开始结束时间范围不能拉伸，只能拖拽
				// eventDurationEditable: true, // Event日程的开始结束时间距离是否可以改变，默认为true,若为false，则表示开始结束时间范围不能拉伸，只能拖拽
				selectable: true, // 是否可以选中日历格
				selectMirror: true,
				selectMinDistance: 0, // 选中日历格的最小距离
				dayMaxEventRows: true, // for all non-TimeGrid views
				moreLinkContent: this.moreLinkContent, //当一块区域内容太多以"+2 more"格式显示时，这个more的名称自定义
				weekends: true,
				navLinks: false, // “xx周”是否可以被点击，默认false，如果为true则周视图“周几”被点击之后进入日视图
				selectHelper: false,
				selectEventOverlap: false, // 相同时间段的多个日程视觉上是否允许重叠，默认为true，允许
				nowIndicator: true, //周/日视图中显示今天当前时间点（以红线标记），默认false不显示
				// dayMaxEvents: true,
				select: this.handleDateClick, //选中日历格事件
				// dateClick: this.handleDateClick, // 日期点击
				eventClick: this.handleEventClick, // 日程点击信息展示
				eventResize: this.onEventResize, // 事件时间区间调
				// eventDrop: this.handleEventDrop, // 日程拖动事件
			},
			scheduleList: [
				{
					id: 211,
					calendar_id: 45,
					color: "",
					schedule_type: 1,
					schedule_dateType: 2,
					end_time: "2025-02-12T08:30:00",
					instructions: "",
					is_allday: 0,
					name: "测试",
					schedule_calendar: { color: "", name: "测试日历" },
					source: "default",
					start_time: "2025-02-12T08:00:00",
				},
				{
					id: 212,
					calendar_id: 46,
					color: "rgba(0, 186, 173)",
					schedule_type: 2,
					schedule_dateType: 1,
					end_time: "2025-02-23T23:59:00",
					instructions: "",
					is_allday: 1,
					name: "测试1",
					schedule_calendar: { color: "#aa47bc", name: "测试日历" },
					source: "default",
					start_time: "2025-02-19T00:00:00",
				},
				{
					id: 213, // 数据id
					calendar_id: 47, // 日历id
					schedule_type: 3, // 日程类型，1为游戏版本，2为运营常规, 3为付费活动, 4为促活活动, 5为节日活动, 6为周年庆
					schedule_dateType: 1, // 日程范围类型
					color: "rgba(121, 72, 234)", // 添加事件的字体颜色
					end_time: "2025-02-27T23:59:00", // 日程结束时间
					instructions: "11111111", // 添加事件的说明
					is_allday: 1, // 0为非全天，1为全天
					name: "测试2", //日程标题
					schedule_calendar: { color: "#aa47bc", name: "测试日历" }, // 日历信息
					source: "default", // 默认为default
					start_time: "2025-02-20T00:00:00", //日程开始时间
				},
			],
			backupScheduleList: [], // 备份日程列表

			rules: {
				schedule_title: [
					{
						required: true,
						message: "日程名称不能为空",
						trigger: "blur",
					},
				],
				schedule_type: [
					{
						required: true,
						message: "日程类型不能为空",
						trigger: "change",
					},
				],
				date: [{ required: true, message: "日期不能为空", trigger: "change" }],
				timeRange: [
					{ required: true, message: "日期不能为空", trigger: "change" },
				],
			},
			// 日程类型选项列表
			schedule_typeList: [
				{ value: 1, label: "游戏版本", isSelected: true },
				{ value: 2, label: "运营常规", isSelected: true },
				{ value: 3, label: "付费活动", isSelected: true },
				{ value: 4, label: "促活活动", isSelected: true },
				{ value: 5, label: "节日活动", isSelected: true },
				{ value: 6, label: "周年庆", isSelected: true },
			],
			currentYear: undefined, // 初始化为当前年份
			currentMonth: moment(), // 初始化为当前月份
			disableList: [],
			eventStates: {},
		};
	},
	computed: {
		// 获取当前时间
		currentTimeShow() {
			return this.currentTime;
		},
		// 是否为区间日程
		isTimeRange() {
			return this.form.schedule_dateType == "1";
		},
		// 是否为点位日程
		isTimePoint() {
			return this.form.schedule_dateType == "2";
		},
	},
	watch: {
		// 监听timeType的变化
		timeType: {
			deep: true,
			handler(val) {
				// 输入验证
				if (!Array.isArray(val)) {
					return;
				}

				// 处理空数组情况
				if (val.length === 0) {
					// 如果 val 为空数组，返回原数组
					this.scheduleList = this.backupScheduleList;
					this.initCalendar();
					return;
				}

				// 处理全选情况
				if (val.length === 2) {
					this.scheduleList = this.backupScheduleList;
					this.initCalendar();
					return;
				}

				// 过滤 scheduleList
				const filteredScheduleList = this.scheduleList.filter((item) =>
					val.includes(item.schedule_dateType),
				);

				// 直接修改 this.scheduleList
				this.scheduleList = filteredScheduleList;
				this.initCalendar();
			},
		},
		// 监听disableList的变化
		disableList: {
			deep: true,
			handler(val) {
				// 如果val 为空数组，则不进行任何操作
				if (val.length === 0) {
					this.scheduleList = this.backupScheduleList;
					this.initCalendar();
					return;
				}

				// 如果val 不为空数组，则在this.scheduleList中过滤掉val数组中存在的值
				this.scheduleList = this.backupScheduleList;
				const filteredScheduleList = this.scheduleList.filter(
					(item) => !val.includes(item.schedule_type),
				);

				// 直接修改 this.scheduleList
				this.scheduleList = filteredScheduleList;
				this.initCalendar();
			},
		},
	},
	created() {},
	mounted() {
		this.initCalendar();
		// 深拷贝创建一个scheduleList数组的备份
		this.backupScheduleList = [...this.scheduleList];
		this.calendarApi = this.$refs.calendarRef.getApi();
	},
	methods: {
		// 月视图日程过多显示样式
		moreLinkContent(arg) {
			return "还有" + arg.num + "个日程";
		},
		// 日程视图-切换
		toggleCurrentType() {
			if (this.currentType == "year") {
				this.$nextTick(function () {
					this.calendarApi = this.$refs.calendarRef.getApi();
					this.calendarApi.gotoDate(moment(this.currentTime).format("YYYY"));
					this.calendarApi.changeView("multiMonthYear"); //切换日历图示形式
				});
			} else {
				this.$nextTick(function () {
					this.calendarApi = this.$refs.calendarRef.getApi();
					this.calendarApi.gotoDate(
						moment(this.currentTime).format("YYYY-MM-DD HH:mm"),
					);
					this.calendarApi.changeView("dayGridMonth");
				});
			}
		},
		// 年份切换时间
		onYearChange(value) {
			if (!value || !moment(value).isValid()) {
				return;
			}
			this.currentYear = value;
			const formattedDate = moment(value).format("YYYY-MM-DD");
			this.calendarApi.gotoDate(formattedDate);
		},
		// 月份切换时间
		onMonthChange(value) {
			if (!value || !moment(value).isValid()) {
				return;
			}

			this.currentMonth = value;
			const formattedDate = moment(value).format("YYYY-MM-DD");
			this.calendarApi.gotoDate(formattedDate);
		},

		// 返回至当前日期
		setCurrentTime() {
			this.currentTime = moment().format("YYYY-MM-DD");
			this.calendarApi.today();
		},
		// 初始化数据显示
		initCalendar() {
			//日程数据以及可以配置的参数 events
			this.calendarOptions.events = this.scheduleList.map((item) => {
				return {
					id: item.id,
					title: item.name, //日程标题
					start: moment(item.start_time).format("YYYY-MM-DD HH:mm"), //日程开始时间
					// 针对设置全天，默认将时分秒设置为00:00:00 会在end时间之间结束（判断已全天形式设定end时间+1）
					end: this.isAllDay(item.start_time, item.end_time)
						? moment(item.end_time).add(1, "day").format("YYYY-MM-DD HH:mm")
						: moment(item.end_time).format("YYYY-MM-DD HH:mm"),
					allDay:
						this.isAllDay(item.start_time, item.end_time) || item.is_allday,
					backgroundColor: this.parseColor(
						this.getColorByScheduleType(item.schedule_type),
						0.4,
					), //背景色
					borderColor: this.parseColor(
						this.getColorByScheduleType(item.schedule_type),
						0.2,
					), //边框色
					textColor: this.getColorByScheduleType(item.schedule_type), //文字颜色
					className: "text-normal", //日程元素可自定义class名称
					/**
					 * 非标准字段:除上述字段外，您还可以在每个事件对象中包含自己的非标准字段。
					 * FullCalendar不会修改或删除这些字段。
					 * 例如，开发人员通常包括描述在回调中使用的字段，
					 * 如事件呈现挂钩. 任何非标准属性都将移动到extendedProps哈希期间事件解析.
					 */
					extendedProps: {
						start: item.start_time
							? moment(item.start_time).format("YYYY-MM-DD")
							: "",
						end_time: item.end_time
							? moment(item.end_time).format("YYYY-MM-DD")
							: "",
						clicked: false,
						hovered: false,
						remark: item.instructions,
						schedule_type: item.schedule_type || "",
						schedule_dateType: item.schedule_dateType || "",
						schcolor: this.getColorByScheduleType(item.schedule_type) || "",
						calendarColor: item.schedule_calendar?.color || "",
					},
				};
			});
			// 初始化 eventStates
			this.eventStates = {};
			this.calendarOptions.events.forEach((event) => {
				this.$set(this.eventStates, event.id, {
					clicked: false,
					hovered: false,
				});
			});
		},
		// 判断是不是全天
		isAllDay(startTime, endTime) {
			// 验证输入是否为有效日期
			const start = new Date(startTime);
			const end = new Date(endTime);

			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				throw new Error("Invalid date format");
			}

			// 获取日期部分
			const startYear = start.getFullYear();
			const startMonth = start.getMonth();
			const startDay = start.getDate();

			const endYear = end.getFullYear();
			const endMonth = end.getMonth();
			const endDay = end.getDate();

			// 确保时间部分为零
			const startTimePart =
				start.getHours() === 0 &&
				start.getMinutes() === 0 &&
				start.getSeconds() === 0;
			const endTimePart =
				end.getHours() === 0 &&
				end.getMinutes() === 0 &&
				end.getSeconds() === 0;

			return (
				startYear === endYear &&
				startMonth === endMonth &&
				startDay === endDay &&
				startTimePart &&
				endTimePart
			);
		},
		// 新增日程
		addSchedule() {
			this.modalVisible = true;
		},
		// 解析颜色
		parseColor(color, alpha) {
			if (color.startsWith("#")) {
				// 十六进制颜色
				return this.hexToRgba(color, alpha);
			} else if (color.startsWith("rgb(")) {
				// RGB 颜色
				return this.rgbToRgba(color, alpha);
			} else if (color.startsWith("rgba(")) {
				// RGBA 颜色
				return this.rgbaToRgba(color, alpha);
			} else {
				// 默认情况下，假设颜色是十六进制
				return this.hexToRgba(color, alpha);
			}
		},
		// 解析为十六进制颜色
		hexToRgba(hex, alpha) {
			// 去掉可能存在的井号
			hex = hex.replace("#", "");
			// 解析十六进制颜色
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);
			// 返回rgba格式的颜色字符串
			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		},
		// 解析为rgba格式
		rgbToRgba(rgb, alpha) {
			// 去掉 rgb( 和 )
			const rgbValues = rgb
				.replace("rgb(", "")
				.replace(")", "")
				.split(",")
				.map(Number);
			// 返回rgba格式的颜色字符串
			return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;
		},
		// 解析为rgba格式
		rgbaToRgba(rgba, alpha) {
			// 去掉 rgba( 和 )
			const rgbaValues = rgba
				.replace("rgba(", "")
				.replace(")", "")
				.split(",")
				.map(Number);
			// 使用新的透明度
			return `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${alpha})`;
		},
		onSubmit() {
			let length = this.scheduleList.length;
			let lastObj = this.scheduleList[length - 1];
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					this.modalVisible = false;
					let obj = {
						id: lastObj.id + 1, // 数据id
						calendar_id: lastObj.calendar_id + 1, // 日历id
						color: this.getColorByScheduleType(this.form.schedule_type), // 添加事件的字体颜色
						end_time:
							this.form.schedule_dateType == 1
								? this.form.timeRange[1]
								: this.form.date, // 日程结束时间
						schedule_type: this.form.schedule_type,
						instructions: this.form.schedule_content, // 添加事件的说明
						is_allday: 1, // 0为非全天，1为全天
						name: this.form.schedule_title, //日程标题
						schedule_calendar: { color: "#aa47bc", name: "测试日历" }, // 日历信息
						source: "default", // 默认为default
						start_time:
							this.form.schedule_dateType == 1
								? this.form.timeRange[0]
								: this.form.date, //日程开始时间
					};
					this.scheduleList.push(obj);
					this.initCalendar();
				} else {
					return false;
				}
			});
		},
		// 重置表单
		resetForm() {
			this.modalVisible = false;
			this.$refs.ruleForm.resetFields();
		},
		// 时间类型切换
		handleDateTypeChange(value) {
			if (value == "1") {
				this.form.date = null;
				// 时间区间
				this.$set(this.rules, "timeRange", [
					{
						required: true,
						message: "时间区间不能为空",
						trigger: "change",
					},
				]);
				this.$delete(this.rules, "date");
			} else if (value == "2") {
				this.form.timeRange = null;
				// 时间点
				this.$set(this.rules, "date", [
					{
						required: true,
						message: "日期不能为空",
						trigger: "change",
					},
				]);
				this.$delete(this.rules, "timeRange");
			}
		},
		// 时间区间切换
		handleTimeRangeChange(dates) {
			if (dates && dates.length === 2) {
				this.form.start_time = dates[0].format(this.dateFormat);
				this.form.end_time = dates[1].format(this.dateFormat);
			} else {
				this.form.start_time = "";
				this.form.end_time = "";
			}
		},
		// 日期切换
		handleDateChange(date) {
			if (date) {
				this.form.start_time = date.format(this.dateFormat);
				this.form.end_time = date.format(this.dateFormat);
			} else {
				this.form.start_time = "";
				this.form.end_time = "";
			}
		},
		// 通过schedule_type来获取不同的颜色值
		getColorByScheduleType(schedule_type) {
			switch (schedule_type) {
				case 1:
					return "rgba(42, 130, 228)";
				case 2:
					return "rgba(121, 72, 234)";
				case 3:
					return "rgba(0, 186, 173)";
				case 4:
					return "rgba(255, 195, 0)";
				case 5:
					return "rgba(255, 87, 51)";
				case 6:
					return "rgba(165, 214, 63)";
			}
		},
		// 日程类型切换
		handleChangeScheduleType(value) {
			if (!value || this.schedule_typeList === undefined) {
				// console.error("Invalid input or schedule_typeList is undefined");
				return;
			}

			// 创建新的 value 对象以避免直接修改传入对象
			const newValue = { ...value, isSelected: !value.isSelected };

			// 更新 this.schedule_typeList 中对应的对象
			const index = this.schedule_typeList.findIndex(
				(item) => item.value === newValue.value,
			);
			if (index !== -1) {
				this.$set(this.schedule_typeList, index, newValue);
			}

			// 收集 this.schedule_typeList 中所有 isSelected 为 false 的对象
			this.disableList = this.schedule_typeList
				.filter((item) => !item.isSelected)
				.map((item) => item.value);
		},
		// 选中日程事件
		handleEventClick(e) {
			e;
			// eslint-disable-next-line no-console
			// console.log(e.event);
		},
		// 编辑日程
		editSchedule(obj) {
			this.modalTitle = "编辑日程";
			this.modalVisible = true;
			// eslint-disable-next-line no-console
			console.log("编辑日程", obj.extendedProps, obj);
			this.form = {
				schedule_title: obj.title,
				schedule_content: obj.extendedProps.remark,
				schedule_type: obj.extendedProps.schedule_type,
				schedule_dateType: obj.extendedProps.schedule_dateType,
				timeRange: obj.extendedProps.schedule_dateType == 1 ? [
					moment(obj.extendedProps.start),
					moment(obj.extendedProps.end_time),
				] : [],
				date: obj.extendedProps.schedule_dateType == 2 ? moment(obj.extendedProps.start) : '',
			};
			this.$set(this.eventStates[obj.id], "clicked", false);
		},
		// 删除日程
		deleteSchedule(id) {
      this.$set(this.eventStates[id], "clicked", false);
      this.$confirm({
        title: "提示",
        content: "确定删除该日程吗？",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          // 删除操作
          let index = this.scheduleList.findIndex((item) => item.id === id);
      
          if (index !== -1) {
            this.scheduleList.splice(index, 1);
            this.initCalendar();
          }
        },
      });
    },

		handleHoverChange(visible, eventId) {
			this.$set(this.eventStates[eventId], "hovered", visible);
			this.$set(this.eventStates[eventId], "clicked", false);
		},
		handleClickChange(visible, eventId) {
			this.$set(this.eventStates[eventId], "clicked", visible);
			this.$set(this.eventStates[eventId], "hovered", false);
		},
	},
};
</script>

<style lang="less" scoped>
ul,
ol {
	margin: 0;
	padding: 0;
	width: auto;
	li {
		list-style: none;
	}
}
.pandle-box {
	width: 90%;
	margin: 0 auto;
	padding-top: 50px;
	&-right {
		&-btn {
			text-align: right;
			margin-bottom: 20px;
		}
		&-serach {
			display: flex;
			margin-bottom: 20px;
			align-items: center;
			justify-content: space-between;
			.calendar-header {
				ul {
					display: flex;
				}
			}
			.calendar-header-box {
				display: flex;
				&-icon {
					width: 25px;
					height: 6px;
					margin-right: 5px;
					border-radius: 2px;
					display: inline-block;
				}
				ul {
					li {
						display: flex;
						line-height: 0.4;
						margin-right: 1.25rem;
						&:hover {
							cursor: pointer;
							color: #409eff;
						}
						transition: all 0.5s;
					}
				}
				&-picker {
					margin-right: 10px;
					&-year,
					&-month {
						width: 120px;
					}
					// &-year {
					// 	margin-right: 10px;
					// }
				}
				.btn-mg:not(:last-child) {
					margin-right: 20px;
				}
			}
		}
		.CalendarBox {
			height: calc(100vh - 200px);
		}
	}
}
.fc-event-title {
	padding: 1px 15px;
}
.CalendarItem {
	display: flex;
}
.calendar-dot {
	display: inline-block;
	width: 4px;
	height: 20px;
}
.actived {
	color: rgba(0, 0, 0, 0.65);
}
.disabled {
	color: rgba(124, 124, 124, 0.25);
}
.popover-title {
	padding: 5px 10px;
	text-align: right;
	&-icon {
		margin-right: 10px;
		&:hover {
			cursor: pointer;
			color: #409eff;
		}
	}
}
.popover-content {
	&-li {
		// display: inline-block;
		padding: 5px 10px;
	}
}
/deep/ .ant-form-item:nth-last-child(1) {
	margin-bottom: 0;
}
</style>
