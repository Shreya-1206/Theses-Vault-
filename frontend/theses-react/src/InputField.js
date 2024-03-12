const InputField = ({name, value, type, placeholder, required, onChange, onKeyUp}) => {
    return ( 
        <div>
            <input 
            type={type} 
            name={name} 
            value={value} 
            placeholder={placeholder} 
            required={required} 
            onChange={onChange} 
            onKeyUp={onKeyUp} 
            ></input>
        </div>
     );
}
 
export default InputField;