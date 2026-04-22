




//% color="#00AA00" iconWidth=50 iconHeight=40
namespace lcd1602_iic {
    
    // ========== 初始化积木 ==========
    //% block="初始化I2C液晶显示屏 地址为 [ADDR]" blockType="command"
    //% ADDR.shadow="number" ADDR.defl="0x27"
    //% ADDR.fieldOptions.decompileLiterals=true
    export function lcdInit(parameter: any) {
        let addr = parameter.ADDR.code;
        Generator.addInclude('wire_include', '#include <Wire.h>');
        Generator.addInclude('lcd_include', '#include <LiquidCrystal_I2C.h>');
        Generator.addObject('lcd_obj', 'LiquidCrystal_I2C', `lcd(${addr}, 16, 2);`);
        Generator.addSetup('lcd_init', `lcd.init();`);
        Generator.addSetup('lcd_backlight', `lcd.backlight();`);
    }

    // ========== 在第X行显示积木 ==========
    //% block="I2C液晶显示屏在第 [ROW] 行显示 [TEXT]" blockType="command"
    //% ROW.shadow="number" ROW.defl="1" ROW.min="1" ROW.max="2"
    //% TEXT.shadow="string" TEXT.defl="hello"
    export function lcdPrintRow(parameter: any) {
        let row = parameter.ROW.code;
        let text = parameter.TEXT.code;
        // Mind+ 行号从1开始，代码从0开始，所以减1
        Generator.addCode(`lcd.setCursor(0, ${row} - 1);`);
        Generator.addCode(`lcd.print(${text});`);
    }

    // ========== 在指定坐标显示积木 ==========
    //% block="I2C液晶显示屏在坐标 X: [X] Y: [Y] 显示 [TEXT]" blockType="command"
    //% X.shadow="number" X.defl="0" X.min="0" X.max="15"
    //% Y.shadow="number" Y.defl="0" Y.min="0" Y.max="1"
    //% TEXT.shadow="string" TEXT.defl="hello"
    export function lcdPrintXY(parameter: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let text = parameter.TEXT.code;
        Generator.addCode(`lcd.setCursor(${x}, ${y});`);
        Generator.addCode(`lcd.print(${text});`);
    }

    // ========== 清屏积木 ==========
    //% block="I2C液晶显示屏清屏" blockType="command"
    export function lcdClear() {
        Generator.addCode(`lcd.clear();`);
    }


    
}