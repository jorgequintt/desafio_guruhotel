import PropTypes from 'prop-types';

function Button({ text, onClick, fontAwesomeClasses, borderless, disabled, rightIcon }) {
   const btnClasses = ['btn'];
   if (borderless) btnClasses.push('borderless');
   if (disabled) btnClasses.push('disabled');

   return (
      <div className={btnClasses.join(' ')} onClick={(e) => (disabled ? null : onClick(e))}>
         <div className="btn-contents" style={{ flexDirection: rightIcon ? 'row-reverse' : 'initial' }}>
            {fontAwesomeClasses && <span className={'btn-icon ' + fontAwesomeClasses}></span>}
            {fontAwesomeClasses && text && <span style={{ margin: '0px 4px' }}></span> /* Margin */}
            {text && <div className="btn-text">{text}</div>}
         </div>
      </div>
   );
}

Button.propTypes = {
   text: PropTypes.string,
   onClick: PropTypes.func,
   fontAwesomeClasses: PropTypes.string,
   borderless: PropTypes.bool,
   disabled: PropTypes.bool,
   rightIcon: PropTypes.bool
};

export default Button;
