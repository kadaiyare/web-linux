# Web Linux

ブラウザ上で動作するLinux/BSDエミュレータ。WebAssemblyベースのx86エミュレータ [v86](https://github.com/copy/v86) を使用。

## デモ

https://kadaiyare.github.io/web-linux/

## 対応OS

- **Buildroot Linux** - 軽量Linuxディストリビューション
- **OpenBSD** - BSD系OS

## ファイル構成

```
web-linux/
├── index.html      # メインページ
├── style.css       # スタイル
├── main.js         # エミュレータ制御
├── v86/            # v86エミュレータ
│   ├── libv86.js
│   ├── v86.wasm
│   ├── seabios.bin
│   └── vgabios.bin
└── images/         # OSイメージ
    ├── linux.iso
    └── openbsd-floppy.img
```

## 技術仕様

- **エミュレータ**: v86 (WebAssembly)
- **CPU**: x86互換 (Pentium 4相当)
- **メモリ**: 256MB
- **VGA**: 8MB

## ライセンス

MIT License

### サードパーティライセンス

- [v86](https://github.com/copy/v86) - BSD-2-Clause License

## 作者

[@kadaiyare](https://github.com/kadaiyare)
