<template>
	<a-calendar v-model="currentValue">
		<template slot="monthCellRender" slot-scope="current">
			<ul class="events">
				<li v-for="item in getListData(current)" :key="item.id">
					{{ item.title }}
				</li>
			</ul>
		</template>
	</a-calendar>
</template>

<script>
import moment from "moment";
import data from "./js/data.json";

export default {
	data() {
		return {
			allData: data,
			currentValue: moment(),
		};
	},
	mounted() {},
	watch: {
		currentValue: {
			deep: true,
			immediate: true,
			handler(val) {
				console.log("currentValue:", val.format("YYYY-MM-DD"));
			},
		},
	},
	methods: {
		formatDate(value) {
			if (!value) return "";
			return value.format("YYYY-MM-DD");
		},
		getListData(value) {
			if (!value) return [];
			const yearMonth = value.format("YYYY-MM");
			const events = this.allData.filter((item) => {
				const startDate = moment(item.startTime);
				const endDate = moment(item.endTime);
				return (
					yearMonth === startDate.format("YYYY-MM") ||
					yearMonth === endDate.format("YYYY-MM") ||
					(yearMonth > startDate.format("YYYY-MM") &&
						yearMonth < endDate.format("YYYY-MM"))
				);
			});
			return events;
		},
	},
};
</script>

<style scoped>
.events {
	list-style: none;
	margin: 0;
	padding: 0;
}
.events .ant-badge-status {
	overflow: hidden;
	white-space: nowrap;
	width: 100%;
	text-overflow: ellipsis;
	font-size: 12px;
}
.notes-month {
	text-align: left;
	font-size: 28px;
}
.notes-month section {
	font-size: 28px;
}
</style>
