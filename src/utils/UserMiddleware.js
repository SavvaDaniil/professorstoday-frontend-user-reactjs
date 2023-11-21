

export default class UserMiddleware 
{

    setJWTToCookie(accessToken)
    {
        var date = new Date();
        date.setTime(date.getTime() + (30*24*60*60*1000));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = "XXXXXXXXXXXXXXXX=" + (accessToken || "")  + expires + "; path=/";
    }

    getJWTFromCookie()
    {
        var nameEQ = "XXXXXXXXXXXXXXXX=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    clearJWTCookie()
    {
        var date = new Date();
        date.setTime(date.getTime() - (1000));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = "XXXXXXXXXXXXXXXX=" + expires + "; path=/";
    }

}