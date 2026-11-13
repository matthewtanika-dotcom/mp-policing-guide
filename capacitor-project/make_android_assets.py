"""Builds every Android launcher icon + splash from the ONE file ../logo.png."""
import os, shutil, glob
from PIL import Image, ImageDraw, ImageFont
HERE=os.path.dirname(os.path.abspath(__file__))
RES=os.path.join(HERE,'android/app/src/main/res')
logo=Image.open(os.path.join(HERE,'..','logo.png')).convert('RGBA')
BG=(10,10,10,255)
# remove stock Capacitor icons so nothing overrides ours
for d in glob.glob(RES+'/mipmap-*')+glob.glob(RES+'/drawable-v24'):
    shutil.rmtree(d,ignore_errors=True)
for f in ('drawable/ic_launcher_background.xml',):
    try: os.remove(os.path.join(RES,f))
    except OSError: pass
def sq(px,bg=True):
    return logo.resize((px,px),Image.LANCZOS)
sizes={'mdpi':48,'hdpi':72,'xhdpi':96,'xxhdpi':144,'xxxhdpi':192}
for d,px in sizes.items():
    o=os.path.join(RES,'mipmap-'+d); os.makedirs(o,exist_ok=True)
    sq(px).convert('RGB').save(o+'/ic_launcher.png')
    r=sq(px); m=Image.new('L',(px*4,px*4),0); ImageDraw.Draw(m).ellipse([0,0,px*4-1,px*4-1],fill=255)
    r.putalpha(m.resize((px,px),Image.LANCZOS)); r.save(o+'/ic_launcher_round.png')
    fg=int(px*108/48); c=Image.new('RGBA',(fg,fg),(0,0,0,0)); k=int(fg*0.72)
    c.alpha_composite(logo.resize((k,k),Image.LANCZOS),((fg-k)//2,(fg-k)//2)); c.save(o+'/ic_launcher_foreground.png')
ad=os.path.join(RES,'mipmap-anydpi-v26'); os.makedirs(ad,exist_ok=True)
xml='<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n<background android:drawable="@color/ic_launcher_background"/>\n<foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n</adaptive-icon>\n'
for n in ('ic_launcher.xml','ic_launcher_round.xml'): open(os.path.join(ad,n),'w').write(xml)
open(os.path.join(RES,'values/ic_launcher_background.xml'),'w').write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n<color name="ic_launcher_background">#0A0A0A</color>\n</resources>\n')
# splash
FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(sz):
    try: return ImageFont.truetype(FB,sz)
    except Exception: return ImageFont.load_default()
def splash(w,h):
    im=Image.new('RGBA',(w,h),BG); u=min(w,h); s=int(u*0.5)
    cy=int(h*0.42); im.alpha_composite(logo.resize((s,s),Image.LANCZOS),((w-s)//2,cy-s//2))
    d=ImageDraw.Draw(im)
    for t,sz,col,dy in (('MP POLICING GUIDE',int(u*0.06),(240,240,242),0.05),('INFORM | REFER | PROTECT',int(u*0.03),(170,172,178),0.14)):
        f=font(sz); b=d.textbbox((0,0),t,font=f); d.text(((w-(b[2]-b[0]))/2,cy+s/2+u*dy),t,font=f,fill=col)
    return im.convert('RGB')
vari={'mdpi':(320,480),'hdpi':(480,800),'xhdpi':(720,1280),'xxhdpi':(960,1600),'xxxhdpi':(1280,1920)}
for d,(w,h) in vari.items():
    for o,(ww,hh) in (('port',(w,h)),('land',(h,w))):
        p=os.path.join(RES,f'drawable-{o}-{d}'); os.makedirs(p,exist_ok=True); splash(ww,hh).save(p+'/splash.png')
os.makedirs(RES+'/drawable',exist_ok=True); splash(480,320).save(RES+'/drawable/splash.png')
print('Android icons + splash built from logo.png')
