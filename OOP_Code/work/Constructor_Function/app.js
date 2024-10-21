// コンストラクタ関数
function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

// Color オブジェクトのプロトタイプに関数を定義すると，プロトタイプ経由で関数を使える
Color.prototype.rgb = function () {
  const { r, g, b } = this;
  return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.rgba = function (a = 1.0) {
  const { r, g, b } = this;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const firstColor = new Color(1, 2, 4);
