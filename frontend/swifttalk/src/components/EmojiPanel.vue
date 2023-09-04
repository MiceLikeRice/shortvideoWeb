<template>
  <div class="emoji-panel">
    <div class="emoji-panel-head">
      <span style="line-height: 30px;color:rgb(239, 232, 232);margin-left:10px;font-size:15px">表情符号</span>
    </div>
    <div class="emoji-content" ref="emojiContent">
      <div class="emoji-page" v-for="(pageEmojis, Index) in pagedEmojis.slice(pageIndex,pageIndex+1)" :key="Index">
        <div
          class="emoji-btn"
          v-for="codePoint in pageEmojis"
          :key="codePoint"
          @click="insertEmoji(codePoint)"
        >
          {{ String.fromCodePoint(codePoint) }}
        </div>
      </div>
    </div>
    <div class="emoji-panel-nav">
      <div class="emoji-panel-nav-dot" v-for="(page,index) in pagedEmojis" :key="index" :style="{ backgroundColor: index === pageIndex ?'yellow': 'aliceblue'   }"  @click="switchPage(index)">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmojiPanel",
  props:['value'],
  data() {
    return {
      emojisPerPage: 40, // 每页显示的 Emoji 数量
      emojis: [], // 所有 Emoji 编码点的数组
      pageIndex:0,
    };
  },
  computed: {
    pagedEmojis() {
      const pages = [];
      for (let i = 0; i < this.emojis.length; i += this.emojisPerPage) {
        pages.push(this.emojis.slice(i, i + this.emojisPerPage));
      }
      return pages;
    },
    emojiCodePoints() {
      const startCodePoint = 0x1F600; // Emoji 表情的起始 Unicode 编码点
      const endCodePoint = 0x1F78F; // Emoji 表情的结束 Unicode 编码点
      const codePoints = [];
      for (let codePoint = startCodePoint; codePoint <= endCodePoint; codePoint++) {
        codePoints.push(codePoint);
      }
      return codePoints;
    },
  },
  methods: {
    insertEmoji(codePoint) {
      // 在这里你可以将选中的 Emoji 插入到文本输入框中，具体操作取决于你的页面结构和逻辑
      // 这里只是一个示例
      console.log(String.fromCodePoint(codePoint)); // 假设通过事件将 Emoji 传递给父组件
      // eslint-disable-next-line vue/no-mutating-props
      this.$emit('input', this.value +String.fromCodePoint(codePoint));
    },
    switchPage(index){
      this.pageIndex=index;
    }
  },
  mounted() {
    // 假设这里加载了所有的 Emoji 编码点到 this.emojis 数组中
    // 在实际应用中，你可能需要从其他地方获取这些数据
    this.emojis = this.emojiCodePoints;
  },
};
</script>

<style scoped>
.emoji-panel-nav{
  display: flex;
  height: 10%;
  justify-content: center;
  align-items: center;
}
.emoji-panel-nav-dot{
  height: 15px;
  width: 15px;
  background-color: aliceblue;
  border-radius: 50%;
  display: inline-block;
  margin: 5px;
}
.emoji-panel-head{
  height: 8%;
  width: 100%;
}
.emoji-panel {
  width: 340px;
  height: 200px; /* 限制面板的高度 */
  background-color: rgb(49, 159, 159);
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 300px;
  top: -350px;
}

.emoji-content {
  overflow-x: auto; /* 水平滚动 */
  height: 76%;
  overflow-y: hidden;
  background-color: rgb(39, 139, 139);
  padding: 5px;
}

.emoji-page {
  height:84%;
  flex-wrap: wrap;
  padding-top:6px;
  padding-bottom: 6px;
}

.emoji-btn {
  font-size: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s;
  height: 35px;
  display: inline-block;
  margin: 4px; /* 调整列距 */
}

.emoji-btn:hover {
  transform: scale(1.3);
}
</style>
