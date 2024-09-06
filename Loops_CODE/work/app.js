let flag = true;
const todos = [];
while(flag) {
    let input = prompt('コマンドを入力してください(new, list, delete, quit)');
    switch(input) {
        case 'new':
            let new_todo = prompt('新しいTODOを入力してください');
            todos.push(new_todo);
            console.log(`「${new_todo}」を追加しました`)
            break;
        case 'list':
            console.log('******************');
            for(let i = 0; i < todos.length; i++) {
                console.log(`${i}: ${todos[i]}`);
            }
            console.log('******************');
            break;
        case 'delete':
            let delete_idx = parseInt(prompt('削除するインデックスを入力してください'));
            if(Number.isNaN(delete_idx)) {
                console.log('有効なインデックスを入力してください');
            } else {
                console.log(`「${todos[delete_idx]}」を削除しました`);
            }
            todos.splice(delete_idx, 1);
            break;
        case 'quit':
            console.log('アプリを終了しました');
            flag = false;
            break;
    }
}