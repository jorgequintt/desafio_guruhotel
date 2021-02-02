import Button from '../Common/Button';

export default function Header() {
   return (
      <div className="header">
         <div className="header-title">Yelp Search App</div>
         <div className="header-fill"></div>
         <div className="header-about-btn-wrapper">
            <Button fontAwesomeClasses={'fas fa-question'} onClick={() => alert('works')} borderless={true} />
         </div>
      </div>
   );
}
