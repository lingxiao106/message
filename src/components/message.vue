<template>
	<el-container>
		<el-header class="header">
			<div class="websockets">
				<el-input type="text" v-model="username1" :disabled="isValidate">
					<template slot="append">
						<el-button type="primary" @click="bindUsername">绑定</el-button>
					</template>
				</el-input>
			</div>
		</el-header>
		<el-main :gutter="6" class="main">
			<el-container style="height: calc(75vh); border: 1px solid #eee;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
				<el-main id="dialogue_box">
					<div v-for="item in msgInfo">
						<div v-if="item.username == username" style="text-align: right;">
							<span v-text="item.username" style="color: #007AFF;"></span> :
							<span v-text="item.msg"></span>
						</div>
						<div v-else>
							<span v-text="item.username" style="color: #4CD964;"></span> :
							<span v-text="item.msg"></span>
						</div>
					</div>
				</el-main>
			</el-container>

		</el-main>
		<el-footer class="footer">
			<el-input placeholder="请输入内容" v-model="message_itext" @keyup.native.enter="websocketsend">
				<template slot="append">
					<el-button type="primary" @click="websocketsend">点击发送请求</el-button>
				</template>
			</el-input>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'test',
		data() {
			return {
				websock: null,
				msgInfo: [],
				username: "",
				message_itext: "",
				username1: "",
				isValidate: false
			}
		},
		created() {
			this.initWebSocket();
		},
		destroyed() {
			this.websock.close() //离开路由之后断开websocket连接
		},
		methods: {
			bindUsername() {
				if (this.username1 == null || this.username1 == "") {
					this.$message.error("请输入用户名");
					return;
				}
				this.username = this.username1;
				this.isValidate = true;
			},
			initWebSocket() { //初始化weosocket
				// const wsuri = "ws://106.52.150.108:8888/ws";
				const wsuri = "ws://127.0.0.1:8888/ws";
				this.websock = new WebSocket(wsuri);
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onclose = this.websocketclose;
			},
			websocketonopen() { //连接建立之后执行send方法发送数据
				this.axios.get("/getMessage")
					.then(res => {
						this.msgInfo = JSON.parse(res.data);
					});
			},
			websocketonerror() { //连接建立失败重连
				this.initWebSocket();
			},
			websocketonmessage(e) { //数据接收
				this.msgInfo.push(JSON.parse(e.data));
				this.$nextTick(function() {
					let div = document.getElementById('dialogue_box');
					div.scrollTop = div.scrollHeight;
				})
			},
			websocketsend() { //数据发送
				if (this.username == null || this.username == "") {
					this.$message.error("请输入用户名");
					return;
				}
				this.websock.send(JSON.stringify({
					username: this.username,
					msg: this.message_itext
				}));
				this.message_itext = null;
			},
			websocketclose(e) { //关闭
				console.log('断开连接', e);
			},
		},
	}
</script>

