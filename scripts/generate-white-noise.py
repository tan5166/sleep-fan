#!/usr/bin/env python3
"""
生成风扇白噪音音频文件
需要安装: pip install numpy scipy
"""

import numpy as np
from scipy.io import wavfile
from scipy import signal
import os

def generate_fan_noise(duration=30, sample_rate=44100, output_file='fan-noise.wav'):
    """
    生成模拟风扇声音的白噪音

    参数:
        duration: 音频时长（秒）
        sample_rate: 采样率（Hz）
        output_file: 输出文件名
    """
    # 生成白噪音
    samples = int(duration * sample_rate)
    white_noise = np.random.uniform(-1, 1, samples)

    # 应用低通滤波器模拟风扇声音（降低高频）
    # 风扇声音主要在低频区域
    nyquist = sample_rate / 2
    cutoff_frequency = 1500  # 截止频率 (Hz)
    normalized_cutoff = cutoff_frequency / nyquist

    # 创建 Butterworth 低通滤波器
    b, a = signal.butter(4, normalized_cutoff, btype='low')
    filtered_noise = signal.filtfilt(b, a, white_noise)

    # 添加一些深度和变化（可选）
    # 添加非常缓慢的音量调制
    t = np.linspace(0, duration, samples)
    modulation = 1 + 0.1 * np.sin(2 * np.pi * 0.2 * t)  # 0.2 Hz 调制
    modulated_noise = filtered_noise * modulation

    # 归一化到 [-1, 1] 范围
    max_val = np.max(np.abs(modulated_noise))
    if max_val > 0:
        normalized_noise = modulated_noise / max_val * 0.8  # 留一些余量
    else:
        normalized_noise = modulated_noise

    # 转换为 16-bit PCM
    audio_data = np.int16(normalized_noise * 32767)

    # 保存为 WAV 文件
    wavfile.write(output_file, sample_rate, audio_data)
    print(f"✅ 成功生成音频文件: {output_file}")
    print(f"   时长: {duration} 秒")
    print(f"   采样率: {sample_rate} Hz")
    print(f"   文件大小: {os.path.getsize(output_file) / 1024:.2f} KB")

if __name__ == "__main__":
    # 生成 30 秒的风扇白噪音
    output_path = "../assets/audio/fan-noise.wav"

    # 确保目录存在
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    generate_fan_noise(
        duration=30,
        sample_rate=44100,
        output_file=output_path
    )

    print("\n📝 下一步:")
    print("1. 将 WAV 转换为 MP3 以减小文件大小（可选）:")
    print("   ffmpeg -i assets/audio/fan-noise.wav -codec:a libmp3lame -qscale:a 2 assets/audio/fan-noise.mp3")
    print("2. 在 hooks/useWhiteNoise.ts 中使用本地文件:")
    print('   const player = useAudioPlayer(require("@/assets/audio/fan-noise.mp3"));')
