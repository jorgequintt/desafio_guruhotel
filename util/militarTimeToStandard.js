export default function convert(time) {
   const hours = time.slice(0, 2);
   const minutes = time.slice(-2);

   const isPM = parseInt(hours) >= 12;
   const conertedTime = `${
      parseInt(hours) > 12 ? ('00' + (parseInt(hours) - 12)).slice(-2) : hours
   }:${minutes} ${isPM ? 'PM' : 'AM'}`;
   return conertedTime;
}
