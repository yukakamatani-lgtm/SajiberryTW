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
        title = "若您符合6項以上，表示・・・";
        desc = `可能已出現較多與鐵質不足相關的警訊，屬於較容易缺乏鐵質的狀態。
建議重新檢視日常飲食與生活習慣，加強健康管理；如對自身健康狀況感到不安，也可考慮諮詢專業人士或醫療機構👩‍⚕️

※本問卷為簡易自我檢測，僅供日常健康管理參考。
※無法取代醫師的診斷或醫療檢查。
※如有任何不適或疑慮，請諮詢專業醫療人員。`;
        finalKeyword = "［Answer］6~"; // ★ 6個以上のキーワード
    } else if (finalCount >= 3) {
        title = "若您符合3～5項，表示・・・";
        desc = `可能已出現較多與缺鐵相關的警訊⚠️
建議可從日常飲食與生活習慣開始調整，加強健康管理，維持良好的身體狀態。

※本問卷為簡易自我檢測，僅供日常健康管理參考。
※無法取代醫師的診斷或醫療檢查。
※如有任何不適或疑慮，請諮詢專業醫療人員。`;
        finalKeyword = "［Answer］3~5"; // ★ 3〜5個のキーワード
    } else if (finalCount >= 1) {
        title = "若您符合1～2項，表示・・・";
        desc = `可能已出現部分與缺鐵相關的生活習慣或身體警訊📋️
建議可適度留意每日的飲食內容與生活作息，為健康做好基礎管理。

※本問卷為簡易自我檢測，僅供日常健康管理參考。
※無法取代醫師的診斷或醫療檢查。
※如有任何不適或疑慮，請諮詢專業醫療人員。`;            
        finalKeyword = "［Answer］1~2"; // ★ 1〜2個のキーワード
    } else {
        title = "若您沒有符合任何一項，表示・・・";
        desc = `目前看起來，缺鐵相關的生活習慣或身體警訊較少✨️
請持續維持現在良好的飲食習慣與生活作息，守護您的健康👏

※本問卷為簡易自我檢測，僅供日常健康管理參考。
※無法取代醫師的診斷或醫療檢查。
※如有任何不適或疑慮，請諮詢專業醫療人員。`;
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
        alert('ERROR: ' + err);
    });
});