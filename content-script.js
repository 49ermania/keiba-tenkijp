'use strict';

const turn = [ '右', '左' ];
const wdir = [ '内向風', '向い風', '外向風', '外横風', '外追風', '追い風', '内追風', '内横風' ];
const dir = [ '北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東',
	      '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西' ];
const r00 = [ 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0 ]; //阪神
const r01 = [ 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0, 7 ]; //園田,姫路,帯広
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
const rc_code = [
  //競馬場
   '1/2/32000',  '1/4/32001', '2/10/32002', '4/18/32003', '3/16/32005', //札幌,函館,福島,新潟,東京
  '3/15/32004', '5/26/32006', '6/29/32007', '6/31/32008', '9/43/32009', //中山,中京,京都,阪神,小倉
   '1/4/32014',  '2/6/32015',  '2/6/32016', '3/14/32020', '3/15/32021', //門別,盛岡,水沢,浦和,船橋
  '3/16/32022', '3/17/32023', '4/20/32024', '5/24/32025', '5/26/32026', //大井,川崎,金沢,笠松,名古屋
  '6/31/32027', '6/31/32028', '8/42/32030', '9/44/32031',  '1/3/32012', //園田,姫路,高知,佐賀,帯広
  //競艇場
  '3/13/32948', '3/14/32949', '3/16/32950', '3/16/32951', '3/16/32952', //桐生,戸田,江戸川,平和島,多摩川
  '5/25/32953', '5/26/32954', '5/26/32955', '5/27/32956', '4/21/32957', //浜名湖,蒲郡,常滑,津,三国
  '6/28/32958', '6/30/32959', '6/31/32960', '8/39/32961', '8/40/32962', //びわこ,住之江,尼崎,鳴門,丸亀
  '7/36/32963', '7/37/32964', '7/38/32965', '7/38/32966', '9/43/32967', //児島,宮島,徳山,下関,若松
  '9/43/32968', '9/43/32969', '9/44/32970', '9/45/32971',               //芦屋,福岡,唐津,大村
  //競輪場
   '1/4/32901',  '2/5/32902', '2/10/32903', '4/18/32904', '3/13/32905', //函館C,青森,いわき平,弥彦,前橋
  '3/11/32907', '3/12/32906', '3/14/32908', '3/14/32909', '3/16/32911', //取手,宇都宮,大宮,西武園,京王閣
  '3/16/32910', '3/15/32912', '3/15/32913', '3/17/32914', '3/17/32916', //立川,松戸,千葉,川崎C,平塚
  '3/17/32917', '5/25/32918', '5/25/32919', '5/26/32921', '5/24/32923', //小田原,伊東,静岡,名古屋C,岐阜
  '5/24/32924', '5/26/32920', '4/19/32927', '5/27/32926', '5/27/32925', //大垣,豊橋,富山,松阪,四日市
  '4/21/32928', '6/32/32931', '6/29/32930', '6/33/32933', '6/30/32932', //福井,奈良,日向町,和歌山,岸和田
  '7/36/32934', '7/37/32935', '7/38/32936', '8/40/32937', '8/39/32939', //玉野,広島,防府,高松,小松島
  '8/42/32941', '8/41/32940', '9/43/32942', '9/43/32943', '9/44/32944', //高知C,松山,小倉C,久留米,武雄
  '9/45/32945', '9/47/32946', '9/46/32947' ];				//佐世保,別府,熊本
const am_code = [
   "1/2/14163",  "1/4/23281", "2/10/36127", "4/18/54236", "3/16/44116", //札幌,函館,福島,新潟,東京
  "3/15/45106", "5/26/51216", "6/29/61326", "6/30/62051", "9/43/82056", //中山,中京,京都,阪神,小倉
   "1/4/22141",  "2/6/33431",  "2/6/33781", "3/14/43241", "3/15/45106", //門別,盛岡,水沢,浦和,船橋
  "3/16/44166", "3/16/44166", "4/20/56227", "5/24/52586", "5/27/53041", //大井,川崎,金沢,笠松,名古屋
  "6/30/62051", "6/31/63383", "8/42/74182", "9/43/82306",  "1/3/20432"  //園田,姫路,高知,佐賀,帯広
  ];

const rc = [
  //競馬場
  '札幌', '函館', '福島', '新潟', '東京', '中山', '中京', '京都', '阪神', '小倉',
  '門別', '盛岡', '水沢', '浦和', '船橋', '大井', '川崎', '金沢', '笠松','名古屋',
  '園田', '姫路', '高知', '佐賀', '帯広',
  //競艇場
 '桐生','戸田','江戸川','平和島','多摩川','浜名湖','蒲郡','常滑',  '津',  '三国',
 'びわこ','住之江','尼崎','鳴門', '丸亀', '児島', '宮島', '徳山', '下関', '若松',
  '芦屋', '福岡', '唐津', '大村',
  //競輪場
  '函館','青森','いわき平','弥彦','前橋', '取手','宇都宮','大宮','西武園','京王閣',
  '立川', '松戸', '千葉', '川崎', '平塚','小田原','伊東', '静岡','名古屋','岐阜',
  '大垣', '豊橋', '富山', '松阪','四日市','福井','奈良','日向町','和歌山','岸和田',
  '玉野', '広島', '防府', '高松','小松島','高知', '松山', '小倉','久留米','武雄',
 '佐世保','別府', '熊本' ];
const rc_turn = [
  0,      0,      0,      1,      1,      0,      1,      0,      0,      0,
  0,      1,      0,      1,      1,      0,      1,      0,      0,      0,
  0,      0,      0,      0,      0,
  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,
  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,
  1,      1,      1,      1 ];
const rc_wdir = [
  r13,    r07,    r11,    l08,    l07,    r12,    l08,    r10,    r00,    r06,
  r07,    l09,    r14,    l13,    l07,    r10,    l15,    r13,    r10,    r09,
  r01,    r01,    r10,    r11,    r01 ];
const name = [ '競馬場', '競艇場', '競輪場' ];
const base = [  0,       25,       49 ];
const num  = [ 25,       24,       43 ];
const prefix = '/leisure/horse/';
const am_prefix = '/amedas/';
const am_suffix = '.html';

//他場リンクリスト作成
const create_link = (code, suffix, type, uls, index) => {
  const ul_ml = document.createElement('ul');
  ul_ml.classList.add("migration-list");

  var p = document.createElement('p');
  p.classList.add("title");
  p.textContent = name[type];
  if (type < 1) {
    var a = document.createElement('a');
    a.href = am_prefix + am_code[index] + am_suffix;
    var img = document.createElement('img');
    img.src = '/static-images/amedas/recent/temp/japan-detail-small.jpg';
    img.alt = 'アメダス';
    img.width = 32;
    img.height = 24;
    a.appendChild(img);
    p.appendChild(a);
  }
  ul_ml.appendChild(p);

  const cols = Math.ceil(num[type] / 13);
  const rows = Math.ceil(num[type] / cols);
  for (var x = 0; x < rows; x++) {
    var li = document.createElement('li');
    for (var y = 0; y < cols; y++) {
      if (cols * x + y < num[type]) {
	if (y > 0)
	  li.appendChild(document.createElement('br'));
	var a = document.createElement('a');
        a.href = prefix + rc_code[base[type] + cols * x + y] + '/' + suffix;
	if (code == rc_code[base[type] + cols * x + y])
	  a.classList.add("selected");
	a.id = 'horse-text-link_' + rc_code[base[type] + cols * x + y].replace(/\d+\/\d+\//, '');
	a.textContent = rc[base[type] + cols * x + y];
	li.appendChild(a);
      }
    }
    ul_ml.appendChild(li);
  }

  for (const ul of uls)
    if (ul.className == 'forecast-select-btn clearfix')
      ul.before(ul_ml);
}

window.addEventListener('DOMContentLoaded', event => {
  //pathname解析
  const pathname2 = window.location.pathname.replace(prefix, '');
  const code = pathname2.replace(/\/[^/]*$/, '');
  const index = rc_code.indexOf(code);
  if (index < 0)
    return; //競馬場、競艇場、競輪場以外は非対応
  const suffix = pathname2.replace(/[\d\/]+\//, '');
  let type = 0; //競馬場
  if (index >= base[1]) {
    if (index < base[2])
      type = 1; //競艇場
    else
      type = 2; //競輪場
  }

  //「他の競馬場の天気」更新・追加
  const uls = document.querySelectorAll('ul');
  for (const ul of uls)
    if (ul.className == 'migration-list')
      ul.remove();
  create_link(code, suffix, type, uls, index);
  if (type >= 1)
    return; //競馬場以外はここまで

  //ヘッダの風向に回りを追加
  const ths = document.querySelectorAll('.wind-blow,.wind-direction th');
  for (const th of ths)
    th.innerHTML = th.innerHTML.replace(/(風向)/g, '<br>$1<br>' + turn[rc_turn[index]] + '回直線');

  //データの直線風向を追加
  const tds = document.querySelectorAll('.wind-blow,.wind-direction td');
  for (const td of tds) {
    const ps = td.querySelectorAll('p');
    for (const p of ps) {
      const dir_index = dir.indexOf(p.textContent);
      if (dir_index >= 0) {
	var p2 = p.cloneNode(true);
	p2.textContent = wdir[rc_wdir[index][dir_index]];
	p.after(p2);
      }
    }
  }
});
