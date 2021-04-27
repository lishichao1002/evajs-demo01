export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// 矩形的碰撞监测
export function rectHitTest(rect1: Rect, rect2: Rect) {
//   console.log(rect1, rect2);
  const { x: x1, y: y1, w: w1, h: h1 } = rect1;
  const { x: x2, y: y2, w: w2, h: h2 } = rect2;
  if (
    Math.abs(x1 - x2) < w1 / 2 + w2 / 2 && //横向判断
    Math.abs(y1 - y2) < h1 / 2 + h2 / 2 //纵向判断
  ) {
    return true;
  }
  return false;
}
