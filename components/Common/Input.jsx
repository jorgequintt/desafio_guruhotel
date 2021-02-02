import PropTypes from 'prop-types';

function Input({ placeholder, value, error, onEnterKey, onChange, disabled }) {
   const inputClasses = ['input-field'];
   if (error) inputClasses.push('input-with-error');

   return (
      <div className="input">
         <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => (e.key === 'Enter' ? onEnterKey() : null)}
            className={inputClasses.join(' ')}
            disabled={disabled}
         />
         {error && <div className="error-msg">{error}</div>}
      </div>
   );
}

Input.propTypes = {
   placeholder: PropTypes.string,
   value: PropTypes.string,
   error: PropTypes.string,
   onChange: PropTypes.func,
   onEnterKey: PropTypes.func,
   disabled: PropTypes.bool
};

export default Input;
