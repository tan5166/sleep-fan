# 音频生成脚本

## 方案 1: 当前测试（在线音频）

应用目前使用在线音频 URL 进行测试，可以立即运行。但需要网络连接。

## 方案 2: 生成本地音频文件

### 使用 Python 脚本（推荐）

1. 安装依赖:
```bash
pip install numpy scipy
```

2. 运行脚本:
```bash
cd scripts
python3 generate-white-noise.py
```

3. （可选）转换为 MP3 减小文件大小:
```bash
ffmpeg -i ../assets/audio/fan-noise.wav -codec:a libmp3lame -qscale:a 2 ../assets/audio/fan-noise.mp3
```

4. 更新 `hooks/useWhiteNoise.ts`:
```typescript
const player = useAudioPlayer(require("@/assets/audio/fan-noise.mp3"));
```

### 在线下载白噪音音频

如果不想自己生成，可以从以下网站下载：

1. **Freesound** (https://freesound.org/)
   - 搜索 "fan white noise" 或 "fan sound"
   - 选择免费使用的音频
   - 下载后重命名为 `fan-noise.mp3`

2. **Pixabay** (https://pixabay.com/sound-effects/)
   - 搜索 "fan" 或 "white noise"
   - 完全免费，无需署名

3. **Zapsplat** (https://www.zapsplat.com/)
   - 提供大量免费音效
   - 注册免费账户后可下载

### 推荐的音频特性

- **时长**: 30-60 秒（会自动循环）
- **格式**: MP3 (压缩) 或 WAV (无损)
- **采样率**: 44.1 kHz
- **比特率**: 128 kbps 或更高
- **特点**: 无缝循环，声音平稳

## 方案 3: 使用预设音频链接

你也可以使用这些免费的在线白噪音链接进行测试：

```typescript
// 雨声
"https://www.soundjay.com/nature/sounds/rain-01.mp3"

// 风扇声（需要找到合适的链接）
// 或使用本地文件
```

## 当前状态

✅ 应用已配置为使用在线音频，可以立即测试
📝 建议后续添加本地音频文件以获得更好的性能和离线支持
