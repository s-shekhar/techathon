const axios = require("axios");
function search(query = "") {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://www.walmart.com/orchestra/snb/graphql/Search/1ad30f090135e3044739d05b77b0290189722b17382ee20b24cdb076d86aee1d/search?variables=%7B%22query%22%3A%22${query}%22%2C%22page%22%3A1%2C%22prg%22%3A%22desktop%22%2C%22sort%22%3A%22best_match%22%2C%22limit%22%3A10%2C%22searchArgs%22%3A%7B%22query%22%3A%22${query}%22%2C%22prg%22%3A%22desktop%22%7D%2C%22enableRelatedSearches%22%3Atrue%2C%22enableFacetCount%22%3Atrue%2C%22fetchMarquee%22%3Atrue%2C%22fetchSkyline%22%3Atrue%2C%22fetchGallery%22%3Afalse%2C%22fetchSbaTop%22%3Atrue%2C%22tenant%22%3A%22WM_GLASS%22%2C%22pageType%22%3A%22SearchPage%22%7D`,
    headers: {
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Cookie:
        'abqme=true; TBV=7; _pxhd=e83a7d6980992f186ef31e7c62fd82645011e453b0cf03c134d4f9825ce1ae8f:14fdc423-f98b-11ed-b805-a3c1d8109ad1; _ga=GA1.2.406593809.1685707415; AMCV_B5281C8B53309CEF0A490D4D%40AdobeOrg=-1124106680%7CMCIDTS%7C19511%7CMCMID%7C88080436891578261941486591058730174290%7CMCAAMLH-1686312977%7C12%7CMCAAMB-1686312977%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1685715377s%7CNONE%7CvVersion%7C5.2.0; _pxvid=14fdc423-f98b-11ed-b805-a3c1d8109ad1; ACID=6f4445a3-a596-4784-b958-eb93d5f866af; hasACID=true; vtc=X_guN1vYh4KxsgGyOKd9YI; AID=wmlspartner%3D0%3Areflectorid%3D0000000000000000000000%3Alastupd%3D1685955911096; userAppVersion=main-1.75.0-bce6b5-0601T1911; locGuestData=eyJpbnRlbnQiOiJTSElQUElORyIsImlzRXhwbGljaXQiOmZhbHNlLCJzdG9yZUludGVudCI6IlBJQ0tVUCIsIm1lcmdlRmxhZyI6ZmFsc2UsImlzRGVmYXVsdGVkIjp0cnVlLCJwaWNrdXAiOnsibm9kZUlkIjoiMzA4MSIsInRpbWVzdGFtcCI6MTY4NTk1NTYzNTEwNX0sInNoaXBwaW5nQWRkcmVzcyI6eyJ0aW1lc3RhbXAiOjE2ODU5NTU2MzUxMDUsInR5cGUiOiJwYXJ0aWFsLWxvY2F0aW9uIiwiZ2lmdEFkZHJlc3MiOmZhbHNlLCJwb3N0YWxDb2RlIjoiOTU4MjkiLCJjaXR5IjoiU2FjcmFtZW50byIsInN0YXRlIjoiQ0EiLCJkZWxpdmVyeVN0b3JlTGlzdCI6W3sibm9kZUlkIjoiMzA4MSIsInR5cGUiOiJERUxJVkVSWSIsInN0b3JlU2VsZWN0aW9uVHlwZSI6IkRFRkFVTFRFRCIsInN0b3JlU2VsZWN0aW9uU291cmNlIjpudWxsLCJ0aW1lc3RhbXAiOjE2ODU5NTU2MzUxMDR9XX0sInBvc3RhbENvZGUiOnsidGltZXN0YW1wIjoxNjg1OTU1NjM1MTA1LCJiYXNlIjoiOTU4MjkifSwidmFsaWRhdGVLZXkiOiJwcm9kOnYyOjZmNDQ0NWEzLWE1OTYtNDc4NC1iOTU4LWViOTNkNWY4NjZhZiJ9; __cf_bm=z36oQ_H02VPgPmqWWEwMz5Z2b.HVZK0f9pn0PLL6Jp0-1685977770-0-AYiqFcI4ur/7djhtawwKtD5qOJPBeW+DHPferM6oJfgKI5QXwunUbTN1PQza0rSJSjMOyIj2MwUZGsqoIBwOp/7+bsbXalALvgk4mc4KON05; auth=MTAyOTYyMDE4CJYalP8ekYww6S8UvjPHSbzooRflYShE9BTxxiarVbJuVxFH9oraHvSGmTCg%2BzoS4ctLaINyjPa4E7%2F37tYYvzovmmWqX19Qjbfuxs3cr8HIRYA5PA3SsNlDIjXvakw%2B767wuZloTfhm7Wk2Kcjygv699%2F6tFVwuL3qJB39WKV9KkHQXUC%2BLfKjkEKiaxRCMnqTGfZ9tjzCgwnEe3H6jlm%2BCbC8Q7DWvQjvXRpgnJOIUMk70P8glgOEpLOprhDfMDCcb9mgycy9jtT1uIyOBHWYjWDFIg%2F%2BTAgMFFUrt%2FWRosDwIjxTHcvMkDyHQRn2iF5m7R%2FSGdjhHY9M%2FsPjfM%2BfgSemD4ZQwbLXGXierjn87hAOJRGNEqDxVAtWptY9NScCePLVGH9Id31Yu2Yvf%2BkjyrOXbKKhH072NS%2FW0j%2FU%3D; locDataV3=eyJpc0RlZmF1bHRlZCI6dHJ1ZSwiaXNFeHBsaWNpdCI6ZmFsc2UsImludGVudCI6IlNISVBQSU5HIiwicGlja3VwIjpbeyJidUlkIjoiMCIsIm5vZGVJZCI6IjMwODEiLCJkaXNwbGF5TmFtZSI6IlNhY3JhbWVudG8gU3VwZXJjZW50ZXIiLCJub2RlVHlwZSI6IlNUT1JFIiwiYWRkcmVzcyI6eyJwb3N0YWxDb2RlIjoiOTU4MjkiLCJhZGRyZXNzTGluZTEiOiI4OTE1IEdlcmJlciBSb2FkIiwiY2l0eSI6IlNhY3JhbWVudG8iLCJzdGF0ZSI6IkNBIiwiY291bnRyeSI6IlVTIiwicG9zdGFsQ29kZTkiOiI5NTgyOS0wMDAwIn0sImdlb1BvaW50Ijp7ImxhdGl0dWRlIjozOC40ODI2NzcsImxvbmdpdHVkZSI6LTEyMS4zNjkwMjZ9LCJpc0dsYXNzRW5hYmxlZCI6dHJ1ZSwic2NoZWR1bGVkRW5hYmxlZCI6dHJ1ZSwidW5TY2hlZHVsZWRFbmFibGVkIjp0cnVlLCJodWJOb2RlSWQiOiIzMDgxIiwic3RvcmVIcnMiOiIwNjowMC0yMzowMCIsInN1cHBvcnRlZEFjY2Vzc1R5cGVzIjpbIlBJQ0tVUF9DVVJCU0lERSIsIlBJQ0tVUF9JTlNUT1JFIl19XSwic2hpcHBpbmdBZGRyZXNzIjp7ImxhdGl0dWRlIjozOC40NzQ2LCJsb25naXR1ZGUiOi0xMjEuMzQzOCwicG9zdGFsQ29kZSI6Ijk1ODI5IiwiY2l0eSI6IlNhY3JhbWVudG8iLCJzdGF0ZSI6IkNBIiwiY291bnRyeUNvZGUiOiJVU0EiLCJnaWZ0QWRkcmVzcyI6ZmFsc2V9LCJhc3NvcnRtZW50Ijp7Im5vZGVJZCI6IjMwODEiLCJkaXNwbGF5TmFtZSI6IlNhY3JhbWVudG8gU3VwZXJjZW50ZXIiLCJpbnRlbnQiOiJQSUNLVVAifSwiaW5zdG9yZSI6ZmFsc2UsImRlbGl2ZXJ5Ijp7ImJ1SWQiOiIwIiwibm9kZUlkIjoiMzA4MSIsImRpc3BsYXlOYW1lIjoiU2FjcmFtZW50byBTdXBlcmNlbnRlciIsIm5vZGVUeXBlIjoiU1RPUkUiLCJhZGRyZXNzIjp7InBvc3RhbENvZGUiOiI5NTgyOSIsImFkZHJlc3NMaW5lMSI6Ijg5MTUgR2VyYmVyIFJvYWQiLCJjaXR5IjoiU2FjcmFtZW50byIsInN0YXRlIjoiQ0EiLCJjb3VudHJ5IjoiVVMiLCJwb3N0YWxDb2RlOSI6Ijk1ODI5LTAwMDAifSwiZ2VvUG9pbnQiOnsibGF0aXR1ZGUiOjM4LjQ4MjY3NywibG9uZ2l0dWRlIjotMTIxLjM2OTAyNn0sImlzR2xhc3NFbmFibGVkIjp0cnVlLCJzY2hlZHVsZWRFbmFibGVkIjp0cnVlLCJ1blNjaGVkdWxlZEVuYWJsZWQiOnRydWUsImFjY2Vzc1BvaW50cyI6W3siYWNjZXNzVHlwZSI6IkRFTElWRVJZX0FERFJFU1MifV0sImh1Yk5vZGVJZCI6IjMwODEiLCJpc0V4cHJlc3NEZWxpdmVyeU9ubHkiOmZhbHNlLCJzdXBwb3J0ZWRBY2Nlc3NUeXBlcyI6WyJERUxJVkVSWV9BRERSRVNTIl19LCJyZWZyZXNoQXQiOjE2ODU5ODE2NDg0NDUsInZhbGlkYXRlS2V5IjoicHJvZDp2Mjo2ZjQ0NDVhMy1hNTk2LTQ3ODQtYjk1OC1lYjkzZDVmODY2YWYifQ%3D%3D; assortmentStoreId=3081; hasLocData=1; bstc=Rza1RhJN3kdAKxI3pOKVzo; mobileweb=0; xpth=x-o-mart%2BB2C~x-o-mverified%2Bfalse; xpa=-bjRJ|0uTG6|14us3|1D1l5|1bHX2|1moXP|2SeeK|2s5aC|7Zo3P|8aSLp|8egVy|8xs3C|GeS9c|GmDfi|IhmrE|JHbjS|LUtaE|Lv8MR|Q6MRm|Qrx4s|S9WVB|X5Bhs|XVDYZ|YnYws|Zwl71|_0yBG|_eCI2|fxJ5G|gEDF5|inPVt|jJAPh|kpr0y|nJiXE|oJANx|pWGxn|ptA5l|yOHQT; exp-ck=0uTG611bHX212SeeK17Zo3P18egVy1GeS9c2JHbjS3LUtaE1Q6MRm1X5Bhs1XVDYZ1YnYws4_eCI22fxJ5G1gEDF51jJAPh2kpr0y1nJiXE1oJANx1pWGxn2ptA5l1; xptwj=qq:b75286e72f1700215046:oIr7GDU5UE4Tr+StxaP0Z09r5s6CxwOoRtGD5h/BsUWczzPYYVZjlCVNVJ7ipzu15UOkxu4HD3e7XcSeToJFiyGh8v/YoAqG9vL0j8adLkDRxbYX7ieo3UrTMP3EbG6GjupT9DGaYVVeSv5gaHkjrKjFRM16H04K5rIR+zai0g==; akavpau_p2=1685978648~id=c11cc63c4431e1d7a1fe324b21d8f89a; _astc=cead029e0db62a40dc790c22a99f0d86; adblocked=true; xptc=assortmentStoreId%2B3081; com.wm.reflector="reflectorid:0000000000000000000000@lastupd:1685978050000@firstcreate:1685955911096"; pxcts=9f40fd45-03b3-11ee-8924-677476755a76; _pxff_cfp=1; xptwg=404717971:21CAE807CB5CB40:5615DDF:51E74056:ADBFF281:57A1272E:; _px3=176d164472ff143fd96764308a7229d81035ead7cb8883fadba49ebfd25b5941:9zsCfs+7DoAtTc4go373qfZcC6jwXnUhkMG1jX4Sp00qnFlIxGWTqGNR9TG2RvZn44FR0jGTQOTw/tTQiYtxag==:1000:w89UY4NXLwdSom5Jo0QzuOWUSZeCw3+YHvhy67Z5JhgOcwrX0y0ZKLzCBnGitAswe/ImATB7YY5WkCK0HyJDFRsUtTTdwCAUTqxtBPBfOf6Vr0xfnRxcS9YyAtlHiYmssNldMgYcrzWsSb1aSRYXI9GrvuCM16wnVOzbOJOLA69i9+DBL71DTdvOyESu9v16QuI9wZC1lHnL5ql7w8gxng==; _pxde=e78da78b53a06a7a95f3e8c810f034845b25b27ad72ff45d3b359a36b5094e75:eyJ0aW1lc3RhbXAiOjE2ODU5NzgwNTM2OTV9; xpm=1%2B1685978050%2BX_guN1vYh4KxsgGyOKd9YI~%2B0; TS012768cf=015444c5223c9be009b21ee1e1cf30770718fa2acbcc680cc514e4dcb4ef0f30f4d878deabeab5f81b974b25c62c1e9b3fcb1a9fc0; TS01a90220=015444c5223c9be009b21ee1e1cf30770718fa2acbcc680cc514e4dcb4ef0f30f4d878deabeab5f81b974b25c62c1e9b3fcb1a9fc0; TS2a5e0c5c027=08dc8c2c6eab20002420a4c6058d575859433fa528307be82b3387c4a46114115255a949d9199fd608db404b5c1130006424f032dc6d6e75cde73a817dca497515b4e00904353624999367b5f6263415b031b3de94bf503b6c074c89acef6a5e; TS01a90220=01fde412db48a436d4f0f4747cb9c43dc4c91335ad07c028310ab3c66b4f974bb86ff1b24a7d9236ab4391d8c29f0cb0362c25bb67; assortmentStoreId=3081; bstc=Rza1RhJN3kdAKxI3pOKVzo; com.wm.reflector="reflectorid:0000000000000000000000@lastupd:1685982206000@firstcreate:1685955911096"; exp-ck=0uTG611bHX212SeeK17Zo3P18egVy1GeS9c2JHbjS3LUtaE1Q6MRm1X5Bhs1XVDYZ1YnYws4_eCI22fxJ5G1gEDF51jJAPh2kpr0y1nJiXE1oJANx1pWGxn2ptA5l2; hasLocData=1; locDataV3=eyJpc0RlZmF1bHRlZCI6dHJ1ZSwiaXNFeHBsaWNpdCI6ZmFsc2UsImludGVudCI6IlNISVBQSU5HIiwicGlja3VwIjpbeyJidUlkIjoiMCIsIm5vZGVJZCI6IjMwODEiLCJkaXNwbGF5TmFtZSI6IlNhY3JhbWVudG8gU3VwZXJjZW50ZXIiLCJub2RlVHlwZSI6IlNUT1JFIiwiYWRkcmVzcyI6eyJwb3N0YWxDb2RlIjoiOTU4MjkiLCJhZGRyZXNzTGluZTEiOiI4OTE1IEdlcmJlciBSb2FkIiwiY2l0eSI6IlNhY3JhbWVudG8iLCJzdGF0ZSI6IkNBIiwiY291bnRyeSI6IlVTIiwicG9zdGFsQ29kZTkiOiI5NTgyOS0wMDAwIn0sImdlb1BvaW50Ijp7ImxhdGl0dWRlIjozOC40ODI2NzcsImxvbmdpdHVkZSI6LTEyMS4zNjkwMjZ9LCJpc0dsYXNzRW5hYmxlZCI6dHJ1ZSwic2NoZWR1bGVkRW5hYmxlZCI6dHJ1ZSwidW5TY2hlZHVsZWRFbmFibGVkIjp0cnVlLCJodWJOb2RlSWQiOiIzMDgxIiwic3RvcmVIcnMiOiIwNjowMC0yMzowMCIsInN1cHBvcnRlZEFjY2Vzc1R5cGVzIjpbIlBJQ0tVUF9DVVJCU0lERSIsIlBJQ0tVUF9JTlNUT1JFIl19XSwic2hpcHBpbmdBZGRyZXNzIjp7ImxhdGl0dWRlIjozOC40NzQ2LCJsb25naXR1ZGUiOi0xMjEuMzQzOCwicG9zdGFsQ29kZSI6Ijk1ODI5IiwiY2l0eSI6IlNhY3JhbWVudG8iLCJzdGF0ZSI6IkNBIiwiY291bnRyeUNvZGUiOiJVU0EiLCJnaWZ0QWRkcmVzcyI6ZmFsc2V9LCJhc3NvcnRtZW50Ijp7Im5vZGVJZCI6IjMwODEiLCJkaXNwbGF5TmFtZSI6IlNhY3JhbWVudG8gU3VwZXJjZW50ZXIiLCJpbnRlbnQiOiJQSUNLVVAifSwiZGVsaXZlcnkiOnsiYnVJZCI6IjAiLCJub2RlSWQiOiIzMDgxIiwiZGlzcGxheU5hbWUiOiJTYWNyYW1lbnRvIFN1cGVyY2VudGVyIiwibm9kZVR5cGUiOiJTVE9SRSIsImFkZHJlc3MiOnsicG9zdGFsQ29kZSI6Ijk1ODI5IiwiYWRkcmVzc0xpbmUxIjoiODkxNSBHZXJiZXIgUm9hZCIsImNpdHkiOiJTYWNyYW1lbnRvIiwic3RhdGUiOiJDQSIsImNvdW50cnkiOiJVUyIsInBvc3RhbENvZGU5IjoiOTU4MjktMDAwMCJ9LCJnZW9Qb2ludCI6eyJsYXRpdHVkZSI6MzguNDgyNjc3LCJsb25naXR1ZGUiOi0xMjEuMzY5MDI2fSwiaXNHbGFzc0VuYWJsZWQiOnRydWUsInNjaGVkdWxlZEVuYWJsZWQiOnRydWUsInVuU2NoZWR1bGVkRW5hYmxlZCI6dHJ1ZSwiYWNjZXNzUG9pbnRzIjpbeyJhY2Nlc3NUeXBlIjoiREVMSVZFUllfQUREUkVTUyJ9XSwiaHViTm9kZUlkIjoiMzA4MSIsImlzRXhwcmVzc0RlbGl2ZXJ5T25seSI6ZmFsc2UsInN1cHBvcnRlZEFjY2Vzc1R5cGVzIjpbIkRFTElWRVJZX0FERFJFU1MiXX0sImluc3RvcmUiOmZhbHNlLCJyZWZyZXNoQXQiOjE2ODU5ODU4MDU2OTAsInZhbGlkYXRlS2V5IjoicHJvZDp2Mjo2ZjQ0NDVhMy1hNTk2LTQ3ODQtYjk1OC1lYjkzZDVmODY2YWYifQ%3D%3D; locGuestData=eyJpbnRlbnQiOiJTSElQUElORyIsImlzRXhwbGljaXQiOmZhbHNlLCJzdG9yZUludGVudCI6IlBJQ0tVUCIsIm1lcmdlRmxhZyI6ZmFsc2UsImlzRGVmYXVsdGVkIjp0cnVlLCJwaWNrdXAiOnsibm9kZUlkIjoiMzA4MSIsInRpbWVzdGFtcCI6MTY4NTk1NTYzNTEwNX0sInNoaXBwaW5nQWRkcmVzcyI6eyJ0aW1lc3RhbXAiOjE2ODU5NTU2MzUxMDUsInR5cGUiOiJwYXJ0aWFsLWxvY2F0aW9uIiwiZ2lmdEFkZHJlc3MiOmZhbHNlLCJwb3N0YWxDb2RlIjoiOTU4MjkiLCJjaXR5IjoiU2FjcmFtZW50byIsInN0YXRlIjoiQ0EiLCJkZWxpdmVyeVN0b3JlTGlzdCI6W3sibm9kZUlkIjoiMzA4MSIsInR5cGUiOiJERUxJVkVSWSIsInN0b3JlU2VsZWN0aW9uVHlwZSI6IkRFRkFVTFRFRCIsInN0b3JlU2VsZWN0aW9uU291cmNlIjpudWxsLCJ0aW1lc3RhbXAiOjE2ODU5NTU2MzUxMDR9XX0sInBvc3RhbENvZGUiOnsidGltZXN0YW1wIjoxNjg1OTU1NjM1MTA1LCJiYXNlIjoiOTU4MjkifSwidmFsaWRhdGVLZXkiOiJwcm9kOnYyOjZmNDQ0NWEzLWE1OTYtNDc4NC1iOTU4LWViOTNkNWY4NjZhZiJ9; mobileweb=0; vtc=X_guN1vYh4KxsgGyOKd9YI; xpa=-bjRJ|0uTG6|14us3|1D1l5|1bHX2|1moXP|2SeeK|2s5aC|7Zo3P|8aSLp|8egVy|8xs3C|GeS9c|GmDfi|IhmrE|JHbjS|LUtaE|Lv8MR|Q6MRm|Qrx4s|S9WVB|X5Bhs|XVDYZ|YnYws|Zwl71|_0yBG|_eCI2|fxJ5G|gEDF5|inPVt|jJAPh|kpr0y|nJiXE|oJANx|pWGxn|ptA5l|yOHQT; xpm=0%2B1685982205%2BX_guN1vYh4KxsgGyOKd9YI~%2B0; xptc=assortmentStoreId%2B3081; xpth=x-o-mart%2BB2C~x-o-mverified%2Bfalse; xptwg=2784990083:13E8A2857951AA0:32B7756:65A88642:85076582:D54DA3DB:; xptwj=qq:c1ac9a92d1ac2a52660c:EDlOdDDP6/I6FJcfEo/v/tfMWvBdD8UplmQH2UrHQPpU4OpAJdq5kmCbsylLDhIHV5Lo0NLD0vxsVAFu1wvPgo/jP01ekGsnc9OWvBpnQbNNc/nytZFxzVozXhovxu91wuRc4ndxISduI5/MnislaWoNM9lYTQ5HyndT6BfINNV32acLYKOt5XbCCgiAL+P7B9fB; TS012768cf=01fde412db48a436d4f0f4747cb9c43dc4c91335ad07c028310ab3c66b4f974bb86ff1b24a7d9236ab4391d8c29f0cb0362c25bb67; TS2a5e0c5c027=084777c757ab2000499f8852eae3bd9ee86bfb81710445aab4dde3b5ec449f0db9b118b8ba36eb3708bb2257c111300087a15ad67eb2b1bb7c8774e2f27f8c0e55772c4861eb69236222dd1cb3b03882598f3a45de646cc36f87d02de8c74aab; abqme=true; akavpau_p2=1685982806~id=5026559e3f9bc91f10e8a78fd620733b',
      DEVICE_PROFILE_REF_ID: "vIXW7un8srLKUcVN6JX2Up5QmKtli6GbwXUJ",
      Referer: `https://www.walmart.com/search?q=${query}`,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      WM_MP: "true",
      WM_PAGE_URL: `https://www.walmart.com/search?q=${query}`,
      "X-APOLLO-OPERATION-NAME": "Search",
      accept: "application/json",
      "accept-language": "en-US",
      "sec-ch-ua":
        '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      traceparent: "00-81a0877e7f3a521940a693ab30c1a0e5-3af4fb0db395f1ff-00",
      "wm_qos.correlation_id": "nFbD7-qNbwpKGShEuiKH5oQTSm5seMGvFTZf",
      "x-enable-server-timing": "1",
      "x-latency-trace": "1",
      "x-o-bu": "WALMART-US",
      "x-o-ccm": "server",
      "x-o-correlation-id": "nFbD7-qNbwpKGShEuiKH5oQTSm5seMGvFTZf",
      "x-o-gql-query": "query Search",
      "x-o-mart": "B2C",
      "x-o-platform": "rweb",
      "x-o-platform-version": "main-1.75.0-bce6b5-0601T1911",
      "x-o-segment": "oaoh",
    },
  };

  return axios
    .request(config)
    .then((response) => {
      const data = response.data.data;
      //   console.log(JSON.stringify(response.data));
      const items = data.search.searchResult.itemStacks[0].itemsV2.filter(
        (item) =>
          item.__typename === "Product" &&
          item.priceInfo?.currentPrice?.priceString &&
          item.availabilityStatusV2.display === "In stock"
      );
      return items.map((item, index) => ({
        price: item.priceInfo?.currentPrice?.priceString,
        name: item.name.substring(0, 25),
        availabilityStatus: "In stock",
        url: item.canonicalUrl,
        id: index,
      }));
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
    });
}

module.exports = {
  search,
};
