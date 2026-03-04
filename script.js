// --- 変数の準備 ---
let finalTitle = "";
let finalCount = 0;
let finalDesc = ""; 
let finalKeyword = ""; // ★ 送信するキーワード用の変数を追加！

// --- LIFFの初期化 ---
liff.init({ 
    liffId: "2009300693-Rh7o0kuJ" 
});

// --- 結果を計算する魔法の処理 ---
function calculateResult() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    finalCount = checkboxes.length;

    let title = "";
    let desc = "";

    if (finalCount >= 6) {
        title = "6個以上当てはまったあなたは・・・";
        desc = `鉄分が不足しやすい状態につながるサインが多く見られます。
日々の食生活や生活習慣を見直すことで、体調管理を意識することはもちろん、体調に不安がある場合は、専門家や医療機関に相談することも一つの選択肢です。

※本チェックは、日常生活を振り返るための簡易的なセルフチェックです。
※医師による診断や検査に代わるものではありません。
※体調に不安がある場合は、医療機関にご相談ください。`;
        finalKeyword = "［Answer］6~"; // ★ 6個以上のキーワード
    } else if (finalCount >= 3) {
        title = "3〜5個当てはまったあなたは・・・";
        desc = `鉄分不足に注意したいサインが、やや多いようです。
日々の食生活や生活習慣を見直すことで、体調管理を意識しましょう。

※本チェックは、日常生活を振り返るための簡易的なセルフチェックです。
※医師による診断や検査に代わるものではありません。
※体調に不安がある場合は、医療機関にご相談ください。`;
        finalKeyword = "［Answer］3~5"; // ★ 3〜5個のキーワード
    } else if (finalCount >= 1) {
        title = "1〜2個当てはまったあなたは・・・";
        desc = `鉄分が不足しがちな生活習慣や体調サインが、いくつか見られるようです📋️
日々の食生活や生活リズムを、少し振り返ってみましょう。

※本チェックは、日常生活を振り返るための簡易的なセルフチェックです。
※医師による診断や検査に代わるものではありません。
※体調に不安がある場合は、医療機関にご相談ください。`;            
        finalKeyword = "［Answer］1~2"; // ★ 1〜2個のキーワード
    } else {
        title = "1個も当てはまらなかったあなたは・・・";
        desc = `現在のところ、鉄分に関する生活習慣や体調のサインは多くありません✨️
今の食生活や生活リズムを引き続き意識していきましょう👏
                
※本チェックは、日常生活を振り返るための簡易的なセルフチェックです。
※医師による診断や検査に代わるものではありません。
※体調に不安がある場合は、医療機関にご相談ください。`;
        finalKeyword = "［Answer］0"; // ★ 0個のキーワード
    }

    // 変数に保存（送信機能で使うため）
    finalTitle = title;
    finalDesc = desc;

    document.getElementById('check-count').innerText = finalCount;
    document.getElementById('result-title').innerText = title;
    document.getElementById('result-desc').innerText = desc;

    document.getElementById('q-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    window.scrollTo(0, 0);
}

// --- LINEにテキストを送信する処理 ---
document.getElementById('sendBtn').addEventListener('click', () => {
    liff.sendMessages([
        {
            // ★ Flex Messageを丸ごと消して、キーワードのテキストだけを送るように変更！
            type: "text",
            text: finalKeyword
        }
    ]).then(() => {
        liff.closeWindow(); 
    }).catch((err) => {
        alert('エラーがおきました: ' + err);
    });
});