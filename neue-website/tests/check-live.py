"""Live access checks; an optional private-site token is accepted through hidden stdin only."""
import sys,json,termios,urllib.request,urllib.error
from urllib.parse import urlparse
if sys.stdin.isatty():
    attrs=termios.tcgetattr(sys.stdin);attrs[3]&=~termios.ECHO;termios.tcsetattr(sys.stdin,termios.TCSANOW,attrs)
print('Ready for live verification JSON on stdin (input is hidden).',flush=True)
config=json.loads(sys.stdin.readline())
origin=config['origin'].rstrip('/')
if urlparse(origin).scheme!='https':raise SystemExit('HTTPS is required')
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs):return None
opener=urllib.request.build_opener(NoRedirect)
def read(path,method='GET',payload=None):
    headers={}
    if config.get('token'):headers['OAI-Sites-Authorization']='Bearer '+config['token']
    data=None
    if payload is not None:
        data=json.dumps(payload).encode();headers.update({'Content-Type':'application/json','Origin':origin})
    request=urllib.request.Request(origin+path,headers=headers,data=data,method=method)
    try:response=opener.open(request,timeout=25)
    except urllib.error.HTTPError as response:
        return response.code,response.headers,response.read(500000).decode('utf-8','replace')
    return response.status,response.headers,response.read(500000).decode('utf-8','replace')
try:
    code,headers,body=read('/api/trainings')
    assert code==401,'Admin API must reject requests without a visitor identity'
    assert headers.get('Cache-Control')=='no-store','Admin API must not be cached'
    assert headers.get('X-Content-Type-Options')=='nosniff','Admin API needs nosniff'
    print('PASS Live Admin API rejects requests without a visitor identity and disables caching',flush=True)
    code,headers,body=read('/api/admin-access/setup','POST',{'password':'not a real secret','confirmation':'not a real secret'})
    assert code==401,'Password setup must reject callers without the owner identity'
    assert not any('__Host-practice-admin=' in value for value in (headers.get_all('Set-Cookie') or [])),'Rejected setup must not grant an admin cookie'
    print('PASS Live password setup rejects requests without the owner identity',flush=True)
    code,headers,body=read('/admin')
    assert code in (200,302,303,307,308),'Unexpected admin response'
    assert 'Alles an einem Ort.' not in body,'Anonymous visitor received admin content'
    assert 'signin-with-chatgpt' in (headers.get('Location','')+body),'Admin must require the platform sign-in'
    assert headers.get('X-Frame-Options')=='DENY','Admin needs framing protection'
    assert "frame-ancestors 'none'" in headers.get('Content-Security-Policy',''),'Admin needs CSP protection'
    print('PASS Live Admin page requires platform sign-in and disallows framing',flush=True)
    code,headers,body=read('/')
    assert code==200 and 'Für kleine Pfoten.' in body,'Public presentation did not render'
    print('PASS Live practice homepage renders successfully',flush=True)
except Exception as error:
    print('Live check incomplete:',type(error).__name__,str(error),flush=True)
    raise SystemExit(1)
