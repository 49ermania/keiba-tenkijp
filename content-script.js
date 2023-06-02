'use strict';

window.addEventListener('DOMContentLoaded', event => {
  const turn_list = [ '右', '左' ];
  const wdir_list = [ '内向風', '向い風', '外向風', '外横風', '外追風', '追い風', '内追風', '内横風' ];
  const dir_list = [ '北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東',
		     '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西' ];
  const r00 = [ 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0 ]; //阪神
  const r01 = [ 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0, 7 ]; //帯広,園田,姫路
  const r06 = [ 4, 4, 3, 3, 2, 2, 1, 1, 0, 0, 7, 7, 6, 6, 5, 5 ]; //小倉
  const r07 = [ 4, 3, 3, 2, 2, 1, 1, 0, 0, 7, 7, 6, 6, 5, 5, 4 ]; //函館,門別
  const r09 = [ 3, 2, 2, 1, 1, 0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3 ]; //名古屋
  const r10 = [ 2, 2, 1, 1, 0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3 ]; //京都,大井,笠松,高知
  const r11 = [ 2, 1, 1, 0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2 ]; //福島,佐賀
  const r12 = [ 1, 1, 0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2 ]; //中山
  const r13 = [ 1, 0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1 ]; //札幌,金沢
  const r14 = [ 0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1 ]; //水沢
  const l07 = [ 3, 4, 4, 5, 5, 6, 6, 7, 7, 0, 0, 1, 1, 2, 2, 3 ]; //東京,船橋
  const l08 = [ 4, 4, 5, 5, 6, 6, 7, 7, 0, 0, 1, 1, 2, 2, 3, 3 ]; //新潟,中京
  const l09 = [ 4, 5, 5, 6, 6, 7, 7, 0, 0, 1, 1, 2, 2, 3, 3, 4 ]; //盛岡
  const l13 = [ 6, 7, 7, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6 ]; //浦和
  const l15 = [ 7, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7 ]; //川崎
  const rc_list = [ '札幌', '函館', '福島', '新潟', '東京', '中山', '中京', '京都', '阪神', '小倉',
		    '帯広', '門別', '盛岡', '水沢', '浦和', '船橋', '大井', '川崎',
		    '金沢', '笠松','名古屋','園田', '姫路', '高知', '佐賀' ];
  const rc_turn = [ 0,      0,      0,      1,      1,      0,      1,      0,      0,      0,
		    0,      0,      1,      0,      1,      1,      0,      1,
		    0,      0,      0,      0,      0,      0,      0      ];
  const rc_wdir = [ r13,    r07,    r11,    l08,    l07,    r12,    l08,   r10,     r00,    r06,
		    r01,    r07,    l09,    r14,    l13,    l07,    r10,   l15,
		    r13,    r10,    r09,    r01,    r01,    r10,    r11    ];

  const racecource = document.title.replace(/競馬場.+$/, '').replace(/^JRA/, '').replace(/^.+（/, '');
  const rc_index = rc_list.indexOf(racecource);
  if (rc_index < 0)
    return;

  const ths = document.querySelectorAll('.wind-blow,.wind-direction th');
  for (const th of ths)
    th.innerHTML = th.innerHTML.replace(/(風向)/g, '<br>$1<br>' + turn_list[rc_turn[rc_index]] + '回直線');

  const tds = document.querySelectorAll('.wind-blow,.wind-direction td');
  for (const td of tds) {
    const ps = td.querySelectorAll('p');
    for (const p of ps) {
      let p2 = p.cloneNode(true);
      const dir = p2.innerHTML.replace(/<([^>]+)>/g, '');
      const dir_index = dir_list.indexOf(dir);
      if (dir_index >= 0) {
        p2.innerHTML = p.innerHTML.replace(dir, wdir_list[rc_wdir[rc_index][dir_index]]);
        p.after(p2);
      }
    }
  }
});
