import {useState} from "react";

const useToken = () => {

    const tokenName = "crudUser";

    const getToken = () => {
        const tokenString = sessionStorage.getItem(tokenName);
        const userToken = JSON.parse(tokenString);
        //const userToken = tokenString;
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem(tokenName, JSON.stringify(userToken));
        setToken(userToken);
        //sessionStorage.setItem(tokenName, userToken);
        //setToken(userToken);
    };
    
    return {
        token: token,
        setToken: saveToken
    };
}

export {useToken};


const authenticate = (method, jsonStr, id) => {
    //return callFetch("https://www.auxpolice.org/crud/cruds/authenticate", method, jsonStr, id);
    return callFetch("http://localhost:8080/crud/cruds/authenticate", method, jsonStr, id);
};

export {authenticate};


const fetchCrud = (method, jsonStr, id) => {
    //return callFetch("https://www.auxpolice.org/crud/cruds", method, jsonStr, id);
    return callFetch("http://localhost:8080/crud/cruds", method, jsonStr, id);
};

export {fetchCrud};


const callFetch = (endPoint, method, jsonStr, id) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept","application/json");

    const crudUser = JSON.parse(sessionStorage.getItem("crudUser"));
    if (crudUser != null) {
        //console.log("crudUser = ", crudUser) ;
        const encodedCreds = window.btoa(crudUser.username + ":" + crudUser.password);
        myHeaders.append("Authorization","Basic " + encodedCreds);
    }
    //myHeaders.append("credentials","include");

    let myInit = {method: method
                ,headers: myHeaders
                ,mode: 'cors'
                ,cache: 'default'
                ,credentials: 'include'
                //,body:body
    };

    let url = endPoint;

    if (id && method === "GET")
        url += "/" + id;

    if (jsonStr.length > 0)
        myInit.body = jsonStr;

    let returnFetch = fetch(url, myInit);

    return returnFetch;
};

export {callFetch};


const formattedDate = date => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "2-digit"
      }).format(date);
};

export {formattedDate};


const round = (number, decPlaces) =>
{
	// rounds number to X decimal places, defaults to 2
	decPlaces = (!decPlaces ? 2 : decPlaces);
	let outStr = Math.round(number * Math.pow(10, decPlaces)) / Math.pow(10, decPlaces);

	if (decPlaces === 2)
	{
		let str = outStr + " ";
	
		if (str.indexOf(".") < 0)
			outStr += ".00";
		else
		if (str.indexOf(".1 ") >= 0 ||
			str.indexOf(".2 ") >= 0 ||
			str.indexOf(".3 ") >= 0 ||
			str.indexOf(".4 ") >= 0 ||
			str.indexOf(".5 ") >= 0 ||
			str.indexOf(".6 ") >= 0 ||
			str.indexOf(".7 ") >= 0 ||
			str.indexOf(".8 ") >= 0 ||
			str.indexOf(".9 ") >= 0 ||
			str.indexOf(".0 ") >= 0)
			outStr += "0";
	}

	return outStr;
};

export {round};


const trim = str =>
{
	let i, j, x;
	let outString;
	
	str = str + ' ';
	
	for (i = 0; i < str.length; i++)
		if (str.charAt(i) > ' ')
			break;			

	for (j = str.length - 1; j >= 0; j--)
		if (str.charAt(j) > ' ')
			break;

	outString = "";

	for (x = i; x <= j; x++)
		outString += str.charAt(x);
		
	return outString;
};

export {trim};


const isBlank = str =>
{
	let string;

	string = trim(str);
	if (string.length)
		return false;
		
	return true;
};

export {isBlank};


const isDigit = x =>
{
	if (!x.length)
		return false;
		
	if (x < '0' || x > '9')
		return false;
		
	return true;
};

export {isDigit};


const isFloat = str =>
{	
	let dotCtr = 0;
	let digitCtr = 0;
	let i;
	
	str = trim(str);

	if (!str.length)
		return false;
	
	for (i = 0; i < str.length; i++)
	{
		if (str.charAt(i) !== '-' &&	!isDigit(str.charAt(i)) && str.charAt(i) !== '.')
			return false;
			
		if (i > 0)
			if (str.charAt(i) === '-')
				return false;
				
		if (str.charAt(i) === '.')
			dotCtr += 1;

		if (isDigit(str.charAt(i)))
			digitCtr++;
	}
	
	if (dotCtr > 1 || digitCtr === 0)
		return false;
			
	return true;
};

export {isFloat};


const isInteger = str =>
{	
	let i;

	str = trim(str);
		
	if (!str.length)
		return false;
		
	for (i = 0; i < str.length; i++)
	{
		if (str.charAt(i) !== '-' &&	!isDigit(str.charAt(i)))
			return false;

		if (i > 0)
			if (str.charAt(i) === '-')
				return false;
	}
			
	return true;
};

export {isInteger};


const isPositiveInteger = str =>
{	
	let i;
	
	str = trim(str);

	if (!str.length)
		return false;
		
	for (i = 0; i < str.length; i++)
		if (!isDigit(str.charAt(i)))
			return false;
			
	return true;
};

export {isPositiveInteger};


const isPositiveFloat = str =>
{	
	let i;
	let dotCtr;

	str = trim(str);

	if (!str.length)
		return false;

	if (str === ".")
		return false;
		
	dotCtr = 0;
	
	for (i = 0; i < str.length; i++)
	{
		if (!isDigit(str.charAt(i)) && str.charAt(i) !== '.')
			return false;
			
		if (str.charAt(i) === '.')
			dotCtr += 1;
	}
	
	if (dotCtr > 1)
		return false;
			
	return true;
};

export {isPositiveFloat};


const editBlank = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	if (isBlank(fieldObj.value))	
	{
		if (msg === "")
			msg = "Required field";
			
		alert(msg);
		fieldObj.focus();
		return false;
	}	
	
	return true;
};

export {editBlank};


const editInteger = (fieldObj, msg) =>
{

	if (fieldObj.disabled)
		return true;

	if (!fieldObj.value.length || fieldObj.value === '-')
	{
		fieldObj.value = '0';
		return true;
	}

	if (!isInteger(fieldObj.value))
		{
			if (msg === "")
				msg = "Value must be a numeric integer";
				
			alert(msg);
			fieldObj.select();
			return false;
		}

	if (!fieldObj.value.length || fieldObj.value === '-')
		fieldObj.value = '0';
	
	return true;
};

export {editInteger};


const editFloat = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	if (!fieldObj.value.length || fieldObj.value === '-')
	{
		fieldObj.value = '0';
		return true;
	}

	if (!isFloat(fieldObj.value))
		{
			if (msg === "")
				msg = "Value must be numeric";
				
			alert(msg);
			fieldObj.select();
			return false;
		}

	if (!fieldObj.value.length || fieldObj.value === '-')
		fieldObj.value = '0';
	
	return true;
};

export {editFloat};


const editPositiveInteger = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	if (!fieldObj.value.length)
	{

		fieldObj.value = '0';
		return true;
	}

	if (!isPositiveInteger(fieldObj.value))
	{
		if (msg === "")
			msg = "Value must be a positive numeric integer";
			
		alert(msg);
		fieldObj.select();
		return false;
	}
		
	return true;
};

export {editPositiveInteger};


const editPositiveFloat = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	if (!fieldObj.value.length)
	{
		fieldObj.value = '0';
		return true;
	}

	if (!isPositiveFloat(fieldObj.value))
	{
		if (msg === "")
			msg = "Value must be a positive numeric number";
			
		alert(msg);
		fieldObj.select();
		return false;
	}
		
	return true;
};

export {editPositiveFloat};


const disableForm = formObj =>
{
	let i;

	for (i = 0; i < formObj.length; i++)
	{
		if (formObj.elements[i].type === "hidden")
			continue;

		formObj.elements[i].disabled = true;
	}
};

export {disableForm};


const enableAllButtons = formObj =>
{
	for (let i = 0; i < formObj.length; i++)
		if (formObj.elements[i].type === "button" || formObj.elements[i].type === "submit")
			formObj.elements[i].disabled = false;
};

export {enableAllButtons};


const isDateDelimiter = c =>
{
	if (c !== '/' && c !== '-')
		return false;
		
	return true;
};

export {isDateDelimiter};


const isValidDate = str =>
{
	let len;
	let pos1;
	let pos2;
	let pos3;
	let pos4;
	let pos5;
	let pos6;
	let month;
	let day;
	let year;
	
	str = trim(str);
	
	len = str.length;
	
	pos1 = str.substring(0, 1);
	pos2 = str.substring(1, 2);
	pos3 = str.substring(2, 3);
	pos4 = str.substring(3, 4);
	pos5 = str.substring(4, 5);
	pos6 = str.substring(5, 6);

	
	if (isDigit(pos1) && isDateDelimiter(pos2) && isDigit(pos3) && isDateDelimiter(pos4))
	{
		month = pos1;
		day = pos3;
		year = str.substring(4, len);		
	}
	else
	if (isPositiveInteger(pos1 + pos2) && isDateDelimiter(pos3) && isPositiveInteger(pos4 + pos5) && isDateDelimiter(pos6))
	{
		month = pos1 + pos2;
		day = pos4 + pos5;
		year = str.substring(6, len);
	}
	else
	if (isDigit(pos1) && isDateDelimiter(pos2) && isPositiveInteger(pos3 + pos4) && isDateDelimiter(pos5))
	{
		month = pos1;
		day = pos3 + pos4;
		year = str.substring(5, len);
	}
	else
	if (isPositiveInteger(pos1 + pos2) && isDateDelimiter(pos3) && isDigit(pos4) && isDateDelimiter(pos5))
	{
		month = pos1 + pos2;
		day = pos4;
		year = str.substring(5, len);
	}
	else
		return null;				

	if (month < 1 || month > 12)
		return null;				
	   
	if (day < 1 || day > 31)
		return null;				

	if (!isPositiveInteger(year))
		return null;				
	   
	if (year.length === 3)
		return null;				

	if (year.length === 4 && (year < 1753 || year > 9999))
		return null;				

	if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31)
		return null;				

	// february, leap year
	if (month === 2)
	{	
		let g = parseInt(year / 4); // feb
		if (isNaN(g))
			return null;				

		if (day > 29)
			return null;				
					
		if (day === 29 && ((year / 4) !== parseInt(year / 4)))
			return null;				
	}
	
	if (month.length === 1)
		month = '0' + month;
		
	if (day.length === 1)
		day = '0' + day;
		
	if (year.length === 1 || year.length === 3)
		year = '0' + year;
		
	return month + '/' + day + '/' + year;
};

export {isValidDate};


const getMonth = str =>
{
	let date;
	let month;
	
	date = isValidDate(str);
	if (!date)
		return null;
		
	month = date.substring(0, 2);

	month -= 0;	
	return month;
};

export {getMonth};


const getDate = str =>
{
	let date;
	let day;

	date = isValidDate(str);
	if (!date)
		return null;
		
	day = date.substring(3, 5);

	day -= 0;	
	return day;
};

export {getDate};


const getWeek = str =>
{
	let date;
	let day;
	let year;
	let dayOfWeek;
	let x;
	
	if (!isValidDate(str))	
		return null;
		
	day = getDate(str);
	year = getYear(str);

	date = new Date(year, "01", day);
	dayOfWeek = date.getDay();
	
	x = parseInt(dayOfWeek) + parseInt(day);
	
	if (x < 8)
		return 1;
		
	if (x < 15)
		return 2;
		
	if (x < 22)
		return 3;
		
	if (x < 29)
		return 4;
		
	return 5;
};

export {getWeek};


const dateOfWeekStarting = (week, year, month) =>
{
	let day;
	let date;
	let dayOfWeek;
	
	switch (parseInt(week)) {
	case 1:
		day = 1;
		break;
	case 2:
		day = 8;
		break;
	case 3:
		day = 15;
		break;
	case 4:
		day = 22;
		break;
	case 5:
		day = 29;
		break;
	default:
		return null;
	}
	
	month--;
	date = new Date(year, month, day);
	dayOfWeek = date.getDay();
	
	return addCalendarDays(++month + '/' + day + '/' + year, -dayOfWeek);	
};

export {dateOfWeekStarting};


const dateOfWeekEnding = (week, year, month) =>
{
	return addCalendarDays(dateOfWeekStarting(week, year, month),6);
};

export {dateOfWeekEnding};


const getYear = str =>
{
	let date;
	let year;

	date = isValidDate(str);
	
	if (!date)
		return null;
		

	year = date.substring(6, date.length);
	switch (year.length) {
	case 3:
		year = '2' + year;
		break;
	case 2:
		if (year > 49)
			year = "19" + year;
		else
			year = "20" + year;
		break;
	case 1:
		year = "200" + year;
		break;
	default:
		year = ""
	}
	
	year -= 0;
	return year;
};

export {getYear};


const getDay = str =>
{
	let month;
	let date;
	let day;
	let year;	
	
	if (!isValidDate(str))	
		return null;
		
	month = getMonth(str);
	month--;
	day = getDate(str);
	year = getYear(str);

	date = new Date(year, month, day);
	return date.getDay();
};

export {getDay};


const addCalendarDay = str =>
{
	let month;
	let day;
	let year;
	let newDate;
	let date;
	
	if (!isValidDate(str))
		return null;
		
	month = getMonth(str);
	day = getDate(str);
	year = getYear(str);

	day -= 0;
	day++;
	
	newDate = month + '/' + day + '/' + year;
	date = isValidDate(newDate);	
	if (date)
		return date;
	
	day = 1;
	month++;
	newDate = month + '/' + day + '/' + year;	
	date = isValidDate(newDate);
	if (date)

		return date;
		
	month = 1;
	year++;
	newDate = month + '/' + day + '/' + year;	
	date = isValidDate(newDate);
	if (date)
		return date;
		
	return null;
};

export {addCalendarDay};


const subtractCalendarDay = str =>
{
	let month;
	let day;
	let year;
	let newDate;

	if (!isValidDate(str))
		return null;
		
	month = getMonth(str);
	day = getDate(str);
	year = getYear(str);

	day--;
	if (day === 0)
	{
		month--;
		
		if (month === 0)
		{
			month = 12;
			year--;
		}
		
		switch (month) {
		case 4 :
		case 6 :
		case 9 :
		case 11 :
			day = 30;
			break;
		case 2 :		
			if (year / 4 === parseInt(year / 4))
				day = 29;
			else
				day = 28;
			break;	
		default:
			day = 31;	
		}
	}
	
	newDate = month + '/' + day + '/' + year;	
	return isValidDate(newDate);	
};

export {subtractCalendarDay};


const addCalendarDays = (str, days) =>
{
	let date;
	let j;
	
	if (!isValidDate(str))
		return null;

	date = str;
	
	if (!days)
		return date;
		
	if (days > 0)
		for (j = 1; j <= days; j++)

			date = addCalendarDay(date);
	else
		for (j = days; j < 0; j++)
			date = subtractCalendarDay(date);
		
	return date;
};

export {addCalendarDays};


const addBusinessDay = str =>
{
	let newDate;
	let dayOfWeek;

	if (!isValidDate(str))
		return null;
		
	dayOfWeek = getDay(str);
	
	switch (dayOfWeek) {
	case 5:
	case 6:
		newDate = addCalendarDays(str, 3);
		break;
	case 0:
		newDate = addCalendarDays(str, 2);
		break;
	default:
		newDate = addCalendarDays(str, 1);		
	}

	return newDate;
};

export {addBusinessDay};


const subtractBusinessDay = str =>
{
	let newDate;
	let dayOfWeek;

	if (!isValidDate(str))
		return null;
		
	dayOfWeek = getDay(str);
	
	switch (dayOfWeek) {
	case 1:
	case 0:
		newDate = addCalendarDays(str, -3);
		break;
	case 6:
		newDate = addCalendarDays(str, -2);
		break;
	default:
		newDate = addCalendarDays(str, -1);		
	}
		
	return newDate;		
};

export {subtractBusinessDay};


const addBusinessDays = (str, days) =>
{
	let date;
	let i;
	
	if (!isValidDate(str))
		return null;

	date = str;
	
	if (!days)

		return date;
		
	if (days > 0)
		for (i = 1; i <= days; i++)
			date = addBusinessDay(date);
	else
		for (i = days; i < 0; i++)
			date = subtractBusinessDay(date);
		
	return date;
};

export {addBusinessDays};


const checkAmPm = rest =>
{
	if (rest === "AM" || rest === " AM")
		return "AM";
		
	if (rest === "PM" || rest === " PM")
		return "PM";

	return "";
};

export {checkAmPm};


const isValidTime = str =>
{
	let pos1;
	let pos2;
	let pos3;
	let pos4;
	let pos5;
	let pos6;
	let pos7;
	let pos8;
	let hours;
	let minutes;
	let seconds;
	let rest;
	let amPm = "";

	str = str.toUpperCase();
	
	pos1 = str.substring(0, 1);
	pos2 = str.substring(1, 2);
	pos3 = str.substring(2, 3);
	pos4 = str.substring(3, 4);
	pos5 = str.substring(4, 5);
	pos6 = str.substring(5, 6);
	pos7 = str.substring(6, 7);
	pos8 = str.substring(7, 8);

	minutes = '';
	seconds = '';
		

	if (isPositiveInteger(pos1) && pos2 === ':' && isPositiveInteger(pos3) && pos4 === ':')
	{//h:m:s xx OR h:m:ss xx
		hours = pos1;
		minutes = pos3;

		if (isPositiveInteger(pos5))
			seconds = pos5;
		else
			return false;
			
		if (isPositiveInteger(pos6))
		{
			seconds += pos6;
			rest = str.substring(6, str.length);			
		}	
		else			
			rest = str.substring(5, str.length);			
		
		let amPm = checkAmPm(rest);
		
		if (amPm === "")
			return false;
	}
	else
	if (isPositiveInteger(pos1) && pos2 === ':' && isPositiveInteger(pos3) && (pos4 === ' ' || pos4 === 'A' || pos4 === 'P'))
	{ //h:m xx
		hours = pos1;
		minutes = pos3;
		
				
		rest = str.substring(3, str.length);
		amPm = checkAmPm(rest);
		
		if (amPm === "")
			return false;
	}
	else
	if (isPositiveInteger(pos1) && pos2 === ':' && isPositiveInteger(pos3) && isPositiveInteger(pos4) && pos5 === ':')
	{//h:mm:s xx OR h:mm:ss xx
		hours = pos1;
		minutes = pos3 + pos4;
		
		if (isPositiveInteger(pos6))
			seconds = pos6;
		else
			return false;
			
		if (isPositiveInteger(pos7))
		{
			seconds += pos7;
			rest = str.substring(7, str.length);			
		}	
		else			
			rest = str.substring(6, str.length);			

		amPm = checkAmPm(rest);
		
		if (amPm === "")
			return false;		
	}
	else
	if (isPositiveInteger(pos1) && pos2 === ':' && isPositiveInteger(pos3) && isPositiveInteger(pos4) && (pos5 === ' ' || pos5 === 'A' || pos5 === 'P'))
	{ //h:mm xx
		hours = pos1;
		minutes = pos3 + pos4;
		
				
		rest = str.substring(4, str.length);
		amPm = checkAmPm(rest);
		
		if (amPm === "")
			return false;
	}
	else
	if (isPositiveInteger(pos1) && isPositiveInteger(pos2) && pos3 === ':' && isPositiveInteger(pos4) && pos5 === ':')
	{//hh:m:s xx OR hh:m:ss xx
		hours = pos1 + pos2;
		minutes = pos4;
		
		if (isPositiveInteger(pos6))
			seconds = pos6;
		else
			return false;
			
		if (isPositiveInteger(pos7))
		{
			seconds += pos7;
			rest = str.substring(7, str.length);			
		}	
		else			
			rest = str.substring(6, str.length);			

		amPm = checkAmPm(rest);
		
		if (amPm === "")
			return false;		
	}
	else
	if (isPositiveInteger(pos1) && isPositiveInteger(pos2) && pos3 === ':' && isPositiveInteger(pos4) && pos5 === ' ')
	{//hh:m xx
		hours = pos1 + pos2;
		minutes = pos4;
		
		rest = str.substring(5, str.length);
		amPm = checkAmPm(rest);
		
		if (amPm === "")
			return false;
	}
	else
	if (isPositiveInteger(pos1) && isPositiveInteger(pos2) && pos3 === ':' && isPositiveInteger(pos4) && isPositiveInteger(pos5) && pos6 === ':')
	{//hh:mm:s xx OR hh:mm:ss xx
		hours = pos1 + pos2;
		minutes = pos4 + pos5;
		
		if (isPositiveInteger(pos7))
			seconds = pos7;
		else
			return false;
			
		if (isPositiveInteger(pos8))
		{
			seconds += pos8;
			rest = str.substring(8, str.length);			
		}	
		else			
			rest = str.substring(7, str.length);			

		amPm = checkAmPm(rest);
		
		if (amPm === "")
			return false;		
	}
	else
	if (isPositiveInteger(pos1) && isPositiveInteger(pos2) && pos3 === ':' && isPositiveInteger(pos4) && isPositiveInteger(pos5) && (pos6 === ' '|| pos6 === 'A' 
|| pos6 === 'P'))
	{//hh:mm xx
		hours = pos1 + pos2;
		minutes = pos4 + pos5;
				
		rest = str.substring(5, str.length);
		amPm = checkAmPm(rest);
		
		if (!amPm)
			return false;
	}
	else
	if (isPositiveInteger(pos1))
	{//h xx OR hh xx
		hours = pos1;
		
		if (isPositiveInteger(pos2))
		{
			hours += pos2;			
			rest = str.substring(2, str.length);			
		}	
		else			
			rest = str.substring(1, str.length);

		amPm = checkAmPm(rest);
		
		if (!amPm)
			return false;
			
	}
	else
		return false;
	
	
	if (hours < 0 || hours > 12)
		return false;
		

	if (minutes < 0 || minutes > 59)
		return false;


	if (seconds < 0 || seconds > 59)
		return false;

	return true;
};

export {isValidTime};


const extractDate = str =>
{
	let divider;
	let date;
	let time;
	
	str = trim(str);
	
	if (isValidDate(str))
		return str;
	
	divider = str.indexOf(' ');
	
	if (divider < 0)
		return null;			
	
	date = str.substring(0, divider);
	
	if (!isValidDate(date))			
		return null;
		
	time = str.substring(divider + 1, str.length);
		
	if (isBlank(time))
		return date;
		
	if (!isValidTime(time))
		return null;
		
	return date;
};

export {extractDate};


const extractTime = str =>
{
	let divider;
	let date;
	let time;
	
	time = "";
	
	str = trim(str);
	
	if (isValidTime(str))
		return str;
	
	divider = str.indexOf(' ');
	
	if (divider < 0)
		return time;			
	
	date = str.substring(0, divider);
	
	if (!isValidDate(date))			
		return null;
		
	time = str.substring(divider + 1, str.length);
	if (isBlank(time))
		return time;
		
	if (!isValidTime(time))
		return null;
		
	return time;
};

export {extractTime};


const isValidDateTime  = str =>
{
	let divider;
	let date;
	let time;
	
	str = trim(str);
	
	if (isValidDate(str) || isValidTime(str))
		return true;
	
	divider = str.indexOf(' ');
	
	date = str.substring(0, divider);

	
	if (divider < 0)
		return false;
	
	if (!isValidDate(date))			
		return false;
		
	time = str.substring(divider + 1, str.length);
		
	if (isBlank(time))
		return true;
		
	if (!isValidTime(time))
		return false;
		
	return true;
};

export {isValidDateTime};


const editDateTime = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	let divider;
	let date;
	let time;
	let month;
	let day;
	let year;
	
	
	fieldObj.value = trim(fieldObj.value);

	let str = fieldObj.value;
	
	divider = str.indexOf(' ');
	
	if (isValidTime(str) || isValidDate(str))
		;
	else
	if (divider < 0)
	{
		date = str;
		if (isPositiveInteger(date))
		{
			month = date.substring(0, 1) + date.substring(1, 2);
			day = date.substring(2, 3) + date.substring(3, 4);
			year = date.substring(4, 5) + date.substring(5, 6) + date.substring(6, 7) + date.substring(7, 8);
		
			fieldObj.value = month + '/' + day + '/' + year;
		}	
	}
	else
	{
		date = str.substring(0, divider);
		time = str.substring(divider + 1, str.length);
			
		if (isPositiveInteger(date))
		{
			month = date.substring(0, 1) + date.substring(1, 2);
			day = date.substring(2, 3) + date.substring(3, 4);
			year = date.substring(4, 5) + date.substring(5, 6) + date.substring(6, 7) + date.substring(7, 8);
	
			fieldObj.value = month + '/' + day + '/' + year + ' ' + time;
		}
	}
	
	if (!isValidDateTime(fieldObj.value))
	{
		if (msg === "")
			msg = "Invalid date/time.  Correct format is : Month/Day/Year hh:mm:ss xx";
			
		alert(msg);
		fieldObj.select();
		return false;
	}	
	
	return true;
};

export {editDateTime};


const editTime = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	fieldObj.value = trim(fieldObj.value);

	if (!isValidTime(fieldObj.value) || fieldObj.value.length < 6)
	{
		if (msg === "")
			msg = "Invalid time.  Correct format is : hh:mm:ss xx";
			
		alert(msg);
		fieldObj.select();
		return false;
	}	
	
	return true;
};

export {editTime};


const editDate = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	let pos1;
	let pos2;
	let pos3;
	let pos4;
	let pos5;
	let pos6;
	let pos7;
	let pos8;
	let month;
	let day;
	let year;

	fieldObj.value = trim(fieldObj.value);

	pos1 = fieldObj.value.substring(0, 1);
	pos2 = fieldObj.value.substring(1, 2);
	pos3 = fieldObj.value.substring(2, 3);
	pos4 = fieldObj.value.substring(3, 4);
	pos5 = fieldObj.value.substring(4, 5);
	pos6 = fieldObj.value.substring(5, 6);
	pos7 = fieldObj.value.substring(6, 7);
	pos8 = fieldObj.value.substring(7, 8);

	if (isPositiveInteger(fieldObj.value))
	{
		month = pos1 + pos2;
		day = pos3 + pos4;
		year = pos5 + pos6 + pos7 + pos8;

		
		fieldObj.value = month + '/' + day + '/' + year;
	}
	
	if (!isValidDate(fieldObj.value))
	{
		if (msg === "")
			msg = "Invalid date.  Correct format is : Month/Day/Year";
			
		alert(msg);
		fieldObj.select();
		return false;
	}

	// Convert 2 digit year to 4 digits


	if (!isPositiveInteger(pos2) && !isPositiveInteger(pos4))
	{ 	// m/d/....
		month = "0" + fieldObj.value.substring(0, 1);
		day = "0" + fieldObj.value.substring(2, 3);
		year = fieldObj.value.substring(4, fieldObj.value.length);
	}
	else
	if (!isPositiveInteger(pos3) && !isPositiveInteger(pos5))
	{ 	// mm/d/....
		month = fieldObj.value.substring(0, 2);
		day = "0" + fieldObj.value.substring(3, 4);
		year = fieldObj.value.substring(5, fieldObj.value.length);
	}
	else
	if (!isPositiveInteger(pos2) && !isPositiveInteger(pos5))
	{ 	// m/dd/....
		month = "0" + fieldObj.value.substring(0, 1);
		day = fieldObj.value.substring(2, 4);
		year = fieldObj.value.substring(5, fieldObj.value.length);
	}
	else
	{ // mm/dd/....
		month = fieldObj.value.substring(0, 2);
		day = fieldObj.value.substring(3, 5);
		year = fieldObj.value.substring(6, fieldObj.value.length);
	}
	
	if (year.length === 2)
	{
		if (parseInt(year) < 71)

			year = "20" + year;
		else
			year = "19" + year;
	}
	else
	if (year.length === 1)
	{
		year = "200" + year;
	}

	fieldObj.value = month + '/' + day + '/' + year;

	return true;
};

export {editDate};


const currentDate = () =>
{
	let currentMonth;
	let dateString;
	let currentDate;
	
	currentDate = new Date();
	
	currentMonth = currentDate.getMonth() + 1;
	
	dateString = currentMonth + '/' + currentDate.getDate() + '/' + currentDate.getYear();
	
	return dateString;
};

export {currentDate};


const currentTime = () =>
{
	let hours;
	let minutes;
	let seconds;
	let amPm;
	let timeString;
	
	let currentDate;
	
	currentDate = new Date();
	
	hours = currentDate.getHours();
	if (hours > 12)
	{
		hours -= 12;
		amPm = "PM";
	}	
	else
	{
		amPm = "AM";
		if (hours === 0)
			hours = 12;
	}
	
	if (hours < 10)
		hours = "0" + hours;
		
	minutes = currentDate.getMinutes();
	if (minutes < 10)
		minutes = "0" + minutes;
	
	seconds = currentDate.getSeconds();
	if (seconds < 10)
		seconds = "0" + seconds;

	timeString = hours + ':' + minutes + ':' + seconds + ' ' + amPm;
	
	return timeString;
};

export {currentTime};


const setToCurrentDate = dateObj =>
{	
	dateObj.value = currentDate();
};

export {setToCurrentDate};


const setToCurrentDateTime = dateObj =>
{	
	dateObj.value = currentDate() + ' ' + currentTime();
};

export {setToCurrentDateTime};


const fieldObjSub = (frmName, fieldObj) =>
{
	let i;
	
	for (i = 0; i < frmName.length; i++)
		if (frmName.elements[i].name === fieldObj.name)
			return i;
	
	return -1;
};

export {fieldObjSub};


const focusNext = (frmName, fieldObj) =>
{
	let i = fieldObjSub(frmName, fieldObj);
	
	if (i < 0)
		return;
		
	for (i = i + 1; i < frmName.length; i++)
		if (frmName.elements[i].disabled === false)
		{
			frmName.elements[i].focus();
			break;
		}			
};

export {focusNext};


const formattedPhoneNo = str =>
{
	let areaCode, exchange, ext, number;
	
	if (!isPositiveInteger(str))
		return str;
		
	areaCode = str.substring(0,3);
	exchange = str.substring(3,6);
	ext = str.substring(6,str.length);
	
	number = areaCode + '-' + exchange + '-' + ext;
	

	return number;	
};

export {formattedPhoneNo};


const isValidPhoneNumber = str =>
{
	let areaCode = str.substring(0,3);
	let firstDash = str.substring(3,4);
	let exchange = str.substring(4,7);
	let secondDash = str.substring(7,8);
	let ext = str.substring(8,str.length);

	if (!isPositiveInteger(areaCode))
		return false;

	if (firstDash !== "-")
		return false;

	if (!isPositiveInteger(exchange))
		return false;

	if (secondDash !== "-")
		return false;

	if (!isPositiveInteger(ext))
		return false;

	return true;
};

export {isValidPhoneNumber};


const editPhoneNumber = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	if (isPositiveInteger(fieldObj.value) && fieldObj.value.length === 10)
	{
		fieldObj.value = formattedPhoneNo(fieldObj.value);
		return true;
	}

	if (!isValidPhoneNumber(fieldObj.value))
	{
		if (msg === "")
			msg = "Invalid phone number format - must be '999-999-9999'";

		alert(msg);
		fieldObj.focus();
		return false;
	}

	return true;
};

export {editPhoneNumber};


const formattedSsn = str =>
{
	let first, second, third, number;
	
	if (!isPositiveInteger(str))
		return str;
		
	first = str.substring(0,3);
	second = str.substring(3,5);
	third = str.substring(5,str.length);
	
	number = first + '-' + second + '-' + third;
	
	return number;	
};

export {formattedSsn};


const isValidSsn = str =>
{
	if (str.length !== 11)
		return false;

	let first = str.substring(0,3);
	let firstDash = str.substring(3,4);
	let second = str.substring(4,6);
	let secondDash = str.substring(6,7);
	let third = str.substring(7,str.length);

	if (!isPositiveInteger(first))
		return false;

	if (firstDash !== "-")
		return false;

	if (!isPositiveInteger(second))
		return false;

	if (secondDash !== "-")
		return false;

	if (!isPositiveInteger(third))
		return false;

	return true;
};

export {isValidSsn};


const editSsn = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	//if (isPositiveInteger(fieldObj.value) && fieldObj.value.length === 9)
	//{
	//	fieldObj.value = formattedSsn(fieldObj.value);

	//	return true;
	//}

	if (!isValidSsn(fieldObj.value))
	{
		if (msg === "")
			msg = "Invalid Social Security# format - must be '999-99-9999'";

		alert(msg);
		fieldObj.focus();
		return false;
	}

	return true;
};

export {editSsn};


const uniCodeEncode = str =>
{
	let outStr;
	let i;

	outStr = '';
	for (i = 0; i < str.length; i++)
		if (str.charAt(i) === '&')
			outStr += "&amp;";
		else
			outStr += str.charAt(i);
			
	return outStr;
};

export {uniCodeEncode};


const xmlSubmitForm = (formObj, action) =>
{
	let xmlhttp = new XMLHttpRequest();
	let xmlDoc = xmlhttp.responseXML;
	let xmlForm;
	let i;
	
	xmlDoc.async="false";
	xmlhttp.Open("POST", action, false);

	let nline = String.fromCharCode(13) + String.fromCharCode(10);
	xmlForm = "<?xml version='1.0'?>" + nline;
	xmlForm += "<FORM>" + nline;
	
	for (i = 0; i < formObj.length; i++)
	{
		if (isBlank(formObj.elements[i].name))
			return (formObj.name + ".elements[" + i + "] missing name attribute");

		xmlForm += '<' + formObj.elements[i].name + '>' + nline;

		if (formObj.elements[i].type === "checkbox" || formObj.elements[i].type === "radio")
			xmlForm += formObj.elements[i].checked;
		else
		if (formObj.elements[i].selectedIndex >= 0)
			xmlForm += uniCodeEncode(formObj.elements[i][formObj.elements[i].selectedIndex].value);
		else
			xmlForm += uniCodeEncode(formObj.elements[i].value) + nline;

		xmlForm += '</' + formObj.elements[i].name + '>' + nline;
	}
	
	xmlForm += "</FORM>";
	xmlhttp.Send(xmlForm);
	
	return xmlhttp.responseText;
};

export {xmlSubmitForm};


const xmlAppendRecord = (formObj, xmlDoc) =>
{	
	let root;
	let itemNode;
	let i;

	root = xmlDoc.documentElement;
	itemNode = xmlDoc.createElement("Record");
	xmlDoc.documentElement = root;
	
	for (i = 0; i < formObj.length; i++)
	{
		itemNode.appendChild(xmlDoc.createElement(formObj.elements[i].name));
		if (formObj.elements[i].type === "checkbox" || formObj.elements[i].type === "radio")
			itemNode.childNodes[i].text = formObj.elements[i].checked;
		else
			itemNode.childNodes[i].text = formObj.elements[i].value;
	}
	
	root.appendChild(itemNode);	
	
	return false;
};

export {xmlAppendRecord};


const xmlPassRecordSet = (xmlObj, action) =>
{	
	let xmlhttp = new XMLHttpRequest();
	let xmlDoc = xmlhttp.responseXML;
	
	xmlDoc.async="false";

	xmlhttp.Open("POST", action, false);
	xmlDoc.load(xmlObj.name + '.xml');

	xmlhttp.Send(xmlObj.XMLDocument);

	return xmlhttp.responseText;
};

export {xmlPassRecordSet};


const xmlDeleteRecordSet = xmlObj =>
{
	let rootNode;
	let i;
		
	rootNode = xmlObj.documentElement;
	
	for (i = rootNode.childNodes.length - 1; i >= 0; i--)
		rootNode.removeChild(rootNode.childNodes.item(i));
};

export {xmlDeleteRecordSet};


const xmlDeleteRecord = (xmlObj, keyFieldName, keyFieldValue) =>
{
	let rootNode;
	let i;
		
	rootNode = xmlObj.documentElement;
	
	for (i = rootNode.childNodes.length - 1; i >= 0; i--)
		if (xmlGetFieldValue(xmlObj, i, keyFieldName) === keyFieldValue)
		{
			rootNode.removeChild(rootNode.childNodes.item(i));
			return true;
		}
	
	return false;
};

export {xmlDeleteRecord};


const xmlBinDeleteRecord = (xmlObj, keyFieldName, keyFieldValue) =>
{
	let rootNode;
	let upper, lower, midPoint;
	let result;
	
	rootNode = xmlObj.documentElement;
	
	lower = 0;
	upper = rootNode.childNodes.length - 1;

	while (true)
	{		
		midPoint = lower + Math.round((upper - lower) / 2);
		result = xmlGetFieldValue(xmlObj, midPoint, keyFieldName);		
		if (result === keyFieldValue)
		{
			
			rootNode.removeChild(rootNode.childNodes.item(midPoint));
			return true;
		}

		if (lower === upper)
			return false;

		if (result > keyFieldValue)
			upper = midPoint - 1;
		else
			lower = midPoint + 1;
	}
};

export {xmlBinDeleteRecord};


const xmlResequence = xmlObj =>
{
	let rootNode;
	let i;
		
	rootNode = xmlObj.documentElement;
	
	for (i = 0; i < rootNode.childNodes.length; i++)
		xmlSetFieldValue(xmlObj, i, "xmlrecord_id", i + 1);
};

export {xmlResequence};


const xmlGetFieldValue = (xmlObj, recno, fieldName) =>
{
	let rootNode;
	let i;
	
	rootNode = xmlObj.documentElement;
	
	for (i = 0; i < rootNode.childNodes(recno).childNodes.length ; i++)
		if (rootNode.childNodes(recno).childNodes(i).baseName.toUpperCase() === fieldName.toUpperCase())
			return rootNode.childNodes(recno).childNodes(i).text;
			
	return null;
};

export {xmlGetFieldValue};


const xmlSearchRecordSet = (xmlObj, keyFieldName, keyFieldValue, resultFieldName) =>
{
	let i;
	let rootNode;
	
	rootNode = xmlObj.documentElement;
	
	for (i = 0; i < rootNode.childNodes.length; i++)
		if (xmlGetFieldValue(xmlObj, i, keyFieldName) === keyFieldValue)
			return xmlGetFieldValue(xmlObj, i, resultFieldName);

	return null;
};

export {xmlSearchRecordSet};


const xmlBinSearchRecordSet = (xmlObj, keyFieldName, keyFieldValue, resultFieldName) =>
{
	let rootNode;
	let upper, lower, midPoint;
	let result;
	
	rootNode = xmlObj.documentElement;
	
	lower = 0;
	upper = rootNode.childNodes.length - 1;

	while (true)
	{		
		midPoint = lower + Math.round((upper - lower) / 2);
		result = xmlGetFieldValue(xmlObj, midPoint, keyFieldName);		
		if (result === keyFieldValue)
			return xmlGetFieldValue(xmlObj, midPoint, resultFieldName);

		if (lower === upper)
			return null;

		if (result > keyFieldValue)
			upper = midPoint - 1;
		else
			lower = midPoint + 1;
	}
};

export {xmlBinSearchRecordSet};


const xmlSetFieldValue = (xmlObj, recno, fieldName, fieldValue) =>
{
	let rootNode;
	let i;
	
	rootNode = xmlObj.documentElement;
	
	for (i = 0; i < rootNode.childNodes(recno).childNodes.length ; i++)
		if (rootNode.childNodes(recno).childNodes(i).baseName.toUpperCase() === fieldName.toUpperCase())
		{
			rootNode.childNodes(recno).childNodes(i).text = fieldValue;
			return true;
		}
			
	return false;
};

export {xmlSetFieldValue};


const xmlUpdateRecordSet = (xmlObj, keyFieldName, keyFieldValue, changeFieldName, changeFieldValue) =>
{
	let i;
	let rootNode;
	
	rootNode = xmlObj.documentElement;
	
	for (i = 0; i < rootNode.childNodes.length; i++)
		if (xmlGetFieldValue(xmlObj, i, keyFieldName) === keyFieldValue)
			return xmlSetFieldValue(xmlObj, i, changeFieldName, changeFieldValue);

	return false;
};

export {xmlUpdateRecordSet};


const xmlBinUpdateRecordSet = (xmlObj, keyFieldName, keyFieldValue, changeFieldName, changeFieldValue) =>
{
	let rootNode;
	let upper, lower, midPoint;
	let result;
	
	rootNode = xmlObj.documentElement;
	
	lower = 0;
	upper = rootNode.childNodes.length - 1;

	while (true)
	{		
		midPoint = lower + Math.round((upper - lower) / 2);

		result = xmlGetFieldValue(xmlObj, midPoint, keyFieldName);		
		if (result === keyFieldValue)
			return xmlSetFieldValue(xmlObj, midPoint, changeFieldName, changeFieldValue);

		if (lower === upper)
			return false;

		if (result > keyFieldValue)
			upper = midPoint - 1;
		else
			lower = midPoint + 1;
	}
};

export {xmlBinUpdateRecordSet};


const trimFormFields = formObj =>
{
	let i;
	
	for (i = 0; i < formObj.length; i++)
		formObj.elements[i].value = trim(formObj.elements[i].value);
};

export {trimFormFields};


const formToUpperCase = formObj =>
{
	let i;
	
	for (i = 0; i < formObj.length; i++)
		if (formObj.elements[i].type === "text" || formObj.elements[i].type === "select-one" || formObj.elements[i].type === "select-multiple" || formObj.elements[i].type === "textarea" || formObj.elements[i].type === "password")
			formObj.elements[i].value = formObj.elements[i].value.toUpperCase();
};

export {formToUpperCase};


const nthSubString = (inString, n) =>
{
	let i, j;
	let str;
	let restOfStr;
	
	if (n < 1 || n > inString.length)
		return null;

	if (inString.length === 1)
		if (n === 1)
			return inString;
		else
			return null;

	str = ' ' + trim(inString) + ' ';
	
	
	//find nth non-blank character preceded by a space
	j = 0;
	for (i = 1; i < str.length; i++)
	{
		if (str.charAt(i - 1) === ' ' && str.charAt(i) > ' ')
		{
			j++;
			if (j === n)
			{
				//find trailing space
				restOfStr = str.substring(i, str.length);				
				return restOfStr.substring(0, 
				restOfStr.indexOf(' '));
			}		
		}		
	}
	
	return null;
};

export {nthSubString};


const pad = (field, length, justify, withThis) =>
{
	let i = 1;
	let workField = "";
		
	field = trim(field + ' ');
	
	if (!field.length)
		field = "";

	let numOfSpaces = length - field.length;			
	
	switch (justify.toUpperCase()) {
	case "L" :
		workField = field;
		for (i = 1; i <= numOfSpaces; i++)
			workField += withThis;
		break;
	case "R" :
		workField = "";
		for (i = 1; i <= numOfSpaces; i++)
			workField += withThis;
			
		workField += field;
		break;
	default:
		workField = ""
	}
        
	return workField;
};

export {pad};


const removeStr = (str1, str2) =>
{
	let tempStr;
	let idx;
	
	tempStr = ' ' + str1 + ' ';
	
	idx = tempStr.indexOf(' ' + str2 + ' ');
	
	if (idx < 0)
		return str1;
		
	idx--;

	return str1.substring(0, idx) + str1.substring(idx + 1 + str2.length, str1.length);
};

export {removeStr};


/* No longer needed. Setting value of form object now accomplished the same thing
function selectDropDown(formObj, value)
{
	let i;
	
	for (i = 0; i < formObj.length; i++)
		if (formObj[i].value === value)
		{
			formObj.selectedIndex = i;
			break;
		}
}
*/

const resetForm = formName =>
{
	for (let i = 0; i < formName.length; i++)
	{	
	
		if (formName.elements[i].type === "text")
			formName.elements[i].value = "";
		
		if (formName.elements[i].type === "select-one")
			formName.elements[i].selectedIndex = 0;

		if (formName.elements[i].type === "select-multiple")
			formName.elements[i].selectedIndex = 0;

		if (formName.elements[i].type === "textarea")
			formName.elements[i].value = "";

		if (formName.elements[i].type === "checkbox")
			formName.elements[i].checked = false;

		if (formName.elements[i].type === "radio")
			formName.elements[i].selected = false;
	}
};

export {resetForm};

/* No longer needed,  new URLSearchParams(window.location.search) accomplishes the same thing
function request(name)
{
	let strptr;
	let wrkstr;
	let work_query_string;
	let srch;



	if (isBlank(name)) // no field name specified 
		return null;

	// precede the field name with '&'
	wrkstr = '&' + name + '=';
    
	srch = document.location.search;
    
	srch = srch.substring(1, srch.length);
	// work_query_string = query_string preceded by '&'
	work_query_string = '&' + srch;
    
	// search for field name in query string 
	strptr = 0;
        
	strptr = work_query_string.indexOf(wrkstr);
	if (strptr < 0)
		return null;

	// advance string pointer to the contents after the '='
	strptr += wrkstr.length;
    
	let tempstr = work_query_string.substring(strptr, work_query_string.length);
    
	let strendptr = tempstr.indexOf('&');
    
	if (strendptr < 0)
		return tempstr;
		
	return tempstr.substring(0, strendptr);
}
*/

const editEmail = (fieldObj, msg) =>
{
	if (fieldObj.disabled)
		return true;

	if (!isValidEmail(fieldObj.value))
	{
		if (trim(msg) === "")
			msg = "Invalid email address";

		alert(msg);
		fieldObj.focus();
		return false;
	}

	return true;
};

export {editEmail};


const isValidEmail = email =>
{
	if (trim(email) === "")
		return false;

	let pos = email.indexOf("@");

	if (pos <= 0)
		return false;

	if (pos >= email.length - 3)
		return false;

	if (!isAlphaNumeric(email.charAt(pos - 1)))
		return false;

	if (!isAlphaNumeric(email.charAt(pos + 1)))
		return false;

	pos = email.indexOf(".");
	if (pos < 1)
		return false;

	for (pos = email.length - 1; pos >= 0; pos--)
	{
		if (email.charAt(pos) === ".")
			break;
	}

	if (pos + 1 === email.length)
		return false;

	if (!isAlphaNumeric(email.charAt(pos - 1)))
		return false;

	if (!isAlphaNumeric(email.charAt(pos + 1)))
		return false;

	return true;
};

export {isValidEmail};


const isValidZipCode = str =>
{
	if (!isPositiveInteger(str.substring(0, 5)))
		return false;

	if (str.length === 5)
		return true;

	if (str.length !== 10)
		return false;

	if (str.substring(5, 6) !== "-" && str.substring(5, 6) !== " " && str.substring(5, 6) !== "")
		return false;

	if (!isPositiveInteger(str.substring(6, str.length)))
		return false;

	return true;
};

export {isValidZipCode};


const editZipCode = (fieldObj, msg) =>
{
	if (!isValidZipCode(fieldObj.value))
	{
		if (msg.length > 0)
			alert(msg);
		else
			alert("Invalid Zip Code Format - must be either 99999 or 99999-9999");

		fieldObj.focus();
		return false;
	}

	return true;
};

export {editZipCode};


const isAlpha = str =>
{	
	let i;

	str = trim(str);
		
	if (!str.length)
		return false;
		
	for (i = 0; i < str.length; i++)
	{
		if ((str.charAt(i) >= "a" && str.charAt(i) <= "z") || (str.charAt(i) >= "A" && str.charAt(i) <= "Z"))
			continue;

		return false;
	}
			
	return true;
};

export {isAlpha};


const editAlpha = (fieldObj, msg) =>
{
	if (containsNumeric(fieldObj.value))
	{
		if (msg.length > 0)
			alert(msg);
		else
			alert("Field must be alphabetic");

		fieldObj.focus();
		return false;
	}

	return true;
};

export {editAlpha};


const containsNumeric = str =>
{
	let i;

	str = trim(str);
		
	if (!str.length)
		return true;
		
	for (i = 0; i < str.length; i++)
		if (isDigit(str.charAt(i)))
			return true;

	return false;
};

export {containsNumeric};


const isAlphaNumeric = str =>
{
	if (!isAlpha(str) && !isPositiveInteger(str))
		return false;

	return true;
};

export {isAlphaNumeric};


const changeRow = (formObj, fieldObj, fieldsPerRow) =>
{
	let sub = fieldObjSub(formObj, fieldObj);
	
	switch (window.event.keyCode) {
	case 40:
		sub += fieldsPerRow;
		break;
	case 38:
		sub -= fieldsPerRow;
		break;
	default:
		return;
	}
	
	if (sub < 0 || sub >= formObj.length)
		return;

	//setTimeout("document." + formObj.name + ".elements[" + sub + "].focus()",175);

	setTimeout(() => "document." + formObj.name + ".elements[" + sub + "].focus()",175);
};

export {changeRow};


const doubleUpQuotes = str =>
{
	if (str.indexOf("'") < 0)
		return str;

	let tempStr = "";

	for (let i = 0; i < str.length; i++)
	{
		tempStr += str.substring(i, i + 1);

		if (str.substring(i, i + 1) === "'")
			tempStr += "'";
	}

	return tempStr;
};

export {doubleUpQuotes};


const doubleUpQuotesOnForm = formObj =>
{
	for (let i = 0; i < formObj.length; i++)
	{
		if (formObj.elements[i].type !== "text" && formObj.elements[i].type !== "hidden")
			continue;

		formObj.elements[i].value = doubleUpQuotes(formObj.elements[i].value);
	}
};

export {doubleUpQuotesOnForm};


const replaceAll = (searchIn, searchFor, replaceWith) =>
{
	let tempStr = searchIn;
	
	while (tempStr.indexOf(searchFor) > -1)
	{
		tempStr = tempStr.replace(searchFor, replaceWith);
	}
	
	return tempStr;
};

export {replaceAll};


const getCookieValue = name =>
{
	let strPtr;
	let workStr;
	let workCookieString;
	let srch;


	if (isBlank(name))
		return null;

	workStr = '; ' + name + '=';
    
	srch = document.cookie;
    
	workCookieString = '; ' + srch;
    
	strPtr = 0;
	
	strPtr = workCookieString.indexOf(workStr);
	if (strPtr < 0)
		return null;

	strPtr += workStr.length;
    
	let tempStr = workCookieString.substring(strPtr, workCookieString.length);
    
	let strEndPtr = tempStr.indexOf(';');
    
	if (strEndPtr < 0)
		return tempStr;
		
	return tempStr.substring(0, strEndPtr);
};

export {getCookieValue};


const setCookieValue = (name, value) =>
{
	document.cookie = name + "=" + value + ";";
};

export {setCookieValue};


const formatDate = fieldObj =>
{
	let separator1 = 1;
	let separator2 = 4;
	let currentByte = fieldObj.value.substring(fieldObj.value.length - 1, fieldObj.value.length);
	let currentPos = fieldObj.value.length - 1;
	let mm = "";
	let dd = "";


	if (fieldObj.value.length > 1)
		mm = fieldObj.value.substring(0, 2);

	if (fieldObj.value.length > 4)
		dd = fieldObj.value.substring(3, 5);

	if (!isDigit(currentByte))
	{
		fieldObj.value = fieldObj.value.substring(0, fieldObj.value.length - 1);
		return;
	}


	if (currentPos === 0 && currentByte > "1")
	{
		fieldObj.value = fieldObj.value.substring(0, fieldObj.value.length - 1);
		return;
	}

	if (currentPos === separator1)
	{
		if (mm > "12")
		{
			fieldObj.value = fieldObj.value.substring(0, fieldObj.value.length - 1);
			return;
		}
	}

	if (currentPos === separator2 - 1)
	{
		if (currentByte > "3" ||(mm === "02" && currentByte > "2"))
		{
			fieldObj.value = fieldObj.value.substring(0, fieldObj.value.length - 1);
			return;
		}
	}

	if (currentPos === separator2)
	{
		switch (mm) {
		case "01" :
		case "03" :
		case "05" :
		case "07" :
		case "08" :
		case "09" :
		case "10" :
		case "12" :
			if (dd > "31")
			{
				fieldObj.value = fieldObj.value.substring(0, fieldObj.value.length - 1);
				return;
			}

			break;
		case "02" :
			if (dd > "29")
			{
				fieldObj.value = fieldObj.value.substring(0, fieldObj.value.length - 1);
				return;
			}

			break;
		default :
			if (dd > "30")
			{
				fieldObj.value = fieldObj.value.substring(0, fieldObj.value.length - 1);
				return;
			}
		}
	}

	if (currentPos === separator1 || currentPos === separator2)
		fieldObj.value += "/";
};

export {formatDate};


const formatNumericField = (fieldObj, delimiter, separator1, separator2) =>
{
	let currentByte = fieldObj.value.substring(fieldObj.value.length - 1, fieldObj.value.length);
	let currentPos = fieldObj.value.length - 1;

	if (!isDigit(currentByte))
	{
		fieldObj.value = fieldObj.value.substring(0, fieldObj.value.length - 1);
		return;
	}

	if (currentPos === separator1 || currentPos === separator2)
		fieldObj.value += delimiter;
};

export {formatNumericField};


const formatSsn = fieldObj =>
{
	formatNumericField(fieldObj, "-", 2, 5);
};

export {formatSsn};


const formatPhoneNo = fieldObj =>
{
	formatNumericField(fieldObj, "-", 2, 6);
};

export {formatPhoneNo};


const formatCurrency = num =>
{
	num = num.toString().replace(/\$|,/g,'');
	let currencySymbol = "$";

	if (isNaN(num))
		num = "0";

	let sign = (num === (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	let cents = num % 100;
	num = Math.floor(num / 100).toString();

	if (cents < 10)
		cents = "0" + cents;

	for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0,num.length-(4*i+3)) + ',' + num.substring(num.length - (4 * i + 3));

	return (((sign) ? '' : '-') + currencySymbol + num + '.' + cents);
};

export {formatCurrency};


const setCookie = (name, value, expires, path, domain, secure ) =>
{
  let today = new Date();
  today.setTime(today.getTime());

  if ( expires )
    expires = expires * 1000;

  let expires_date = new Date( today.getTime() + (expires) );

  document.cookie = name + "=" + escape( value ) +
      (( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
      (( path ) ? ";path=" + path : "" ) + 
      (( domain ) ? ";domain=" + domain : "" ) +
      (( secure ) ? ";secure" : "" );
};

export {setCookie};
   

const deleteCookie = (name, path, domain) =>
{
	if (getCookieValue(name)) 
	{
    	document.cookie = name + "=" +
          (( path ) ? ";path=" + path : "") +
          (( domain ) ? ";domain=" + domain : "" ) +
          ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
};

export {deleteCookie};