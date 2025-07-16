import {IOption} from "../api/basic/types";

// 根据value，返回option中的label
export const getLabelFromOption = (value:string|undefined,option: IOption[]) => {
    if(value){
        return option.find(item => item.value === value)?.label || '';
    }else{
        return ''
    }
}