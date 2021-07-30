var buttonClicked = true;
// 防止多次点击 
function buttonClick(fn) {
    let that = this;
    if (buttonClicked) {
        buttonClicked = false;
        fn();
        setTimeout(function () {
            buttonClicked = true;
        }, 800)
    } else {
        
    }
}
export {
    buttonClick
}

module.exports = {
	buttonClick:buttonClick
}

