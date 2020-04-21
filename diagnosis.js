'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const imageDivided = document.getElementById('image-area');


/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) { // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

userNameInput.onkeydown = (event) => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) { // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);
  
  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);
  
  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
  + encodeURIComponent('あなたのいいところ')
  + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);
  
  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);

  // イメージエリアの作成
  removeAllChildren(imageDivided);
  const photo = document.createElement('img');
  photo.className = 'img-fluid';
  const choice = getimag(userName);
  photo.setAttribute('src', choice);
  imageDivided.appendChild(photo);
};

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、聞き心地がよく心に残ります。',
  '{userName}のいいところはまなざしです。きれいな目をしている{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。仕事熱心な{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。「あなたのようになりたい」とも思うでしょう。',
  '{userName}のいいところは知識です。教養があり博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。人を惹きつける{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。頭の回転が速い{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。いつも礼儀正しい内側から溢れ出る{userName}の良さに、皆が気を惹かれます。',
  '{userName}のいいところは決断力です。リーダーシップがある{userName}がする決断に、いつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。面倒見がいい{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。包容力がある{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。誠実で強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていくアグレッシブな{userName}の心構えが、多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。本当に気がきく{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。夢がある、ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。「やばい！」と思ったときに、しっかりと衝動を抑えられる{userName}の落ち着きが皆から評価されています。',
  '{userName}のいいところは優しさです。安心する{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

const answers2 = [
    "img/list.png",
    "img/list2.png",
    "img/list3.png",
    "img/list4.png",
    "img/list5.png",
    "img/list6.png",
    "img/list7.png",
    "img/list8.png",
    "img/list9.png",
    "img/list10.png",
    "img/list11.png",
    "img/list12.png",
    "img/list13.png",
    "img/list14.png",
    "img/list15.png",
    "img/list16.png",
    "img/list17.png"
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/{userName}/g, userName);
  return result;
}

function getimag(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index2 = sumOfCharCode % answers.length;
  let choice = answers2[index2];
  return choice;
}

// テストコード
console.assert(
  assessment('太郎') === '太郎のいいところはユニークさです。太郎だけのその特徴が皆を楽しくさせます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);