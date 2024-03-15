import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';

//         interface: Input Box 컴포넌트 Properties                 //
interface Props {
   label: string;
   type: 'text'|'password';
   placeholder: string,
   value: string;
   setValue: Dispatch<SetStateAction<string>>;
   error: boolean;  

   icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
   onButtonClick?: () => void;

   message?: string;

   onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

//         component: Input Box 컴포넌트          //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) =>  {

   //         state: properties           //
  const { label, type, placeholder, value, error, icon, message } = props;
  const { setValue,onButtonClick, onKeyDown } = props;

  //         event halnder : input 값 변경 이벤트  처리 함수//
const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setValue(value);
}

const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(!onKeyDown) return;
  onKeyDown(event);
}
   //         render: Input Box 컴포넌트         //
    return (
     <div className='inputbox'>
       <div className='inputbox-label'>{label}</div>
       <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
         <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChangeHandler} onKeyDown={onKeyDown} />
           {onButtonClick !== undefined && (
           <div className='icon-button' onClick={onButtonClick}>
            {icon !== undefined && (<div className={`icon ${icon}`}></div>)}
           </div>   
           )}
       </div>
       {message !== undefined && (<div className='inputbox-message'>{message}</div>)}      
    </div>
    )
});

export default InputBox;