const { useState, useMemo } = React;

const RAW_DATA = [
{id:0,name:"Sha\'ar HaMada",city:"Rehovot",height:null,floors:18,status:"Topped Out",lat:31.8822,lng:34.7969},
{id:1,name:"EXchange (Office Tower)",city:"Ramat Gan",height:197.0,floors:49,status:"Topped Out",lat:32.07659,lng:34.82752},
{id:819,name:"EXchange (Residential Tower)",city:"Ramat Gan",height:206.5,floors:59,status:"Completed",lat:32.07659,lng:34.82752},
{id:2,name:"Beyond (Office Tower)",city:"Givatayim",height:313.0,floors:78,status:"Topped Out",url:"https://www.skyscrapercity.com/threads/givatayim-beyond-313-m-m-78-70-fl-t-o.1598637/",lat:32.07528,lng:34.80223},
{id:802,name:"Midtown (Office Tower)",city:"Tel Aviv",height:197.0,floors:50,status:"Completed",lat:32.07713,lng:34.79356},
{id:803,name:"Midtown (Residential Tower)",city:"Tel Aviv",height:183.0,floors:50,status:"Completed",lat:32.07713,lng:34.79356},
{id:804,name:"HaArba'a Towers (Tower 1)",city:"Tel Aviv",height:160.0,floors:37,status:"Completed",lat:32.07451,lng:34.79132},
{id:805,name:"HaArba'a Towers (Tower 2)",city:"Tel Aviv",height:150.0,floors:40,status:"Completed",lat:32.07451,lng:34.79132},
{id:794,name:"Beyond (Residential Tower)",city:"Givatayim",height:null,floors:70,status:"Approved",url:"https://www.skyscrapercity.com/threads/givatayim-beyond-313-m-m-78-70-fl-t-o.1598637/",lat:32.07528,lng:34.80223},
{id:3,name:"ANNA",city:"Bat Yam",height:87.45,floors:25,status:"Under Construction",lat:32.02267,lng:34.75845},
{id:4,name:"Aura Pivko",city:"Bat Yam",height:null,floors:null,status:"Under Construction",lat:32.01836,lng:34.74867},
{id:5,name:"Rubinstein Giv\'atayim Estate",city:"Givatayim",height:159.0,floors:40,status:"Completed",lat:32.06235,lng:34.79789},
{id:6,name:"BST Towers (BSTowers) (20fl Tower)",city:"Petah Tikva",height:null,floors:20,status:"Under Construction",lat:32.09864,lng:34.892},
{id:7,name:"22–28 Eilat EB (Tower 1)",city:"Holon",height:null,floors:34,status:"Approved",lat:32.02313,lng:34.78142},
{id:928,name:"22–28 Eilat EB (Tower 2)",city:"Holon",height:null,floors:34,status:"Approved",lat:32.02313,lng:34.78142},
{id:929,name:"22–28 Eilat EB (Tower 3)",city:"Holon",height:null,floors:18,status:"Approved",lat:32.02313,lng:34.78142},
{id:8,name:"Nave Park",city:"Petah Tikva",height:null,floors:30,status:"Topped Out",lat:32.09002,lng:34.89744},
{id:9,name:"Rova Ayalon (Tower 1)",city:"Bat Yam",height:152.0,floors:45,status:"Topped Out",lat:32.02181,lng:34.74976},
{id:834,name:"Rova Ayalon (Tower 2)",city:"Bat Yam",height:152.0,floors:45,status:"Topped Out",lat:32.02181,lng:34.74976},
{id:835,name:"Rova Ayalon (Tower 3)",city:"Bat Yam",height:152.0,floors:45,status:"Topped Out",lat:32.02181,lng:34.74976},
{id:811,name:"Sea Towers (Tower 1)",city:"Bat Yam",height:null,floors:28,status:"Approved",lat:32.02784,lng:34.7378},
{id:812,name:"Sea Towers (Tower 2)",city:"Bat Yam",height:null,floors:28,status:"Approved",lat:32.02784,lng:34.7378},
{id:813,name:"Balfour Towers (Tower 1)",city:"Bat Yam",height:null,floors:34,status:"Approved",lat:32.03043,lng:34.75845},
{id:814,name:"Balfour Towers (Tower 2)",city:"Bat Yam",height:null,floors:34,status:"Approved",lat:32.03043,lng:34.75845},
{id:10,name:"Aliyat Hanoar/Taas EB",city:"Givatayim",height:null,floors:39,status:"Approved",lat:32.0658,lng:34.79897},
{id:11,name:"HaTayasim EB",city:"Holon",height:null,floors:10,status:"Approved",lat:32.00589,lng:34.79229},
{id:12,name:"Global Towers (Building D)",city:"Petah Tikva",height:86.0,floors:20,status:"Completed",url:"https://www.skyscrapercity.com/threads/petah-tikva-global-towers-32-36-fl-125-140m-1-completed-2-u-c.1972498/",lat:32.09778,lng:34.88331},
{id:816,name:"Global Towers (Tower A)",city:"Petah Tikva",height:167.0,floors:43,status:"Completed",url:"https://www.skyscrapercity.com/threads/petah-tikva-global-towers-32-36-fl-125-140m-1-completed-2-u-c.1972498/",lat:32.09778,lng:34.88331},
{id:817,name:"Global Towers (Tower B)",city:"Petah Tikva",height:141.0,floors:36,status:"Completed",url:"https://www.skyscrapercity.com/threads/petah-tikva-global-towers-32-36-fl-125-140m-1-completed-2-u-c.1972498/",lat:32.09778,lng:34.88331},
{id:818,name:"Global Gold (Phase A)",city:"Petah Tikva",height:144.0,floors:34,status:"Topped Out",url:"https://www.skyscrapercity.com/threads/petah-tikva-global-towers-32-36-fl-125-140m-1-completed-2-u-c.1972498/",lat:32.09778,lng:34.88331},
{id:13,name:"BSR 1K",city:"Rishon LeZion",height:null,floors:25,status:"Topped Out",lat:31.97947,lng:34.80283},
{id:14,name:"Kata Idol",city:"Petah Tikva",height:null,floors:28,status:"Topped Out",lat:32.08916,lng:34.88874},
{id:15,name:"Avenue One",city:"Ramat Gan",height:null,floors:34,status:"Approved",lat:32.06624,lng:34.81556},
{id:16,name:"City Gate (fmr. Peri Place)",city:"Rehovot",height:null,floors:24,status:"Planned",lat:31.88823,lng:34.81538},
{id:17,name:"OliO (Tower 2)",city:"Bat Yam",height:null,floors:10,status:"Topped Out",lat:32.01232,lng:34.7465},
{id:788,name:"OliO (Tower 1)",city:"Bat Yam",height:null,floors:42,status:"Topped Out",lat:32.01232,lng:34.7465},
{id:18,name:"HaMatmid EB",city:"Ramat Gan",height:null,floors:30,status:"Approved",lat:32.07831,lng:34.83621},
{id:19,name:"BIG Kaniel Towers (Tower 1)",city:"Petah Tikva",height:null,floors:40,status:"Under Construction",lat:32.0926,lng:34.88983},
{id:20,name:"Tr3s (Krol Towers) (Tower 1)",city:"Petah Tikva",height:null,floors:35,status:"Planned",lat:32.08829,lng:34.88005},
{id:21,name:"17 Aba Hillel",city:"Ramat Gan",height:200.0,floors:44,status:"Planned",lat:32.06538,lng:34.83187},
{id:22,name:"Vertical (Bursa Triangle) (Tower 1)",city:"Ramat Gan",height:null,floors:111,status:"Proposed",url:"https://www.skyscrapercity.com/threads/ramat-gan-bursa-triangle-3-x-60-fl-approved.2056367/",lat:32.06107,lng:34.82208},
{id:978,name:"Vertical (Bursa Triangle) (Tower 2)",city:"Ramat Gan",height:null,floors:72,status:"Proposed",url:"https://www.skyscrapercity.com/threads/ramat-gan-bursa-triangle-3-x-60-fl-approved.2056367/",lat:32.06107,lng:34.82208},
{id:979,name:"Vertical (Bursa Triangle) (Tower 3)",city:"Ramat Gan",height:null,floors:60,status:"Proposed",url:"https://www.skyscrapercity.com/threads/ramat-gan-bursa-triangle-3-x-60-fl-approved.2056367/",lat:32.06107,lng:34.82208},
{id:23,name:"I M Givatayim",city:"Givatayim",height:null,floors:31,status:"Completed",lat:32.05976,lng:34.7968},
{id:24,name:"Blue & The City",city:"Bat Yam",height:null,floors:32,status:"Under Construction",lat:32.03215,lng:34.75302},
{id:25,name:"Avraham Tower",city:"Bat Yam",height:161.0,floors:45,status:"Planned",lat:32.02784,lng:34.74323},
{id:26,name:"The Park",city:"Bnei Brak",height:null,floors:42,status:"Completed",lat:32.08113,lng:34.84195},
{id:27,name:"Reisdor Towers (Tower 1)",city:"Bnei Brak",height:null,floors:35,status:"Topped Out",url:"https://www.skyscrapercity.com/threads/bnei-brak-reisdor-towers-2x35-fl-1-t-o.2336277/",lat:32.07682,lng:34.83217},
{id:934,name:"Reisdor Towers (Tower 2)",city:"Bnei Brak",height:null,floors:35,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/bnei-brak-reisdor-towers-2x35-fl-1-t-o.2336277/",lat:32.07682,lng:34.83217},
{id:28,name:"Mala Towers (Tower 1)",city:"Petah Tikva",height:null,floors:25,status:"Marketing",lat:32.07881,lng:34.87679},
{id:29,name:"Lyfe Bat Yam (fmr. Amad)",city:"Bat Yam",height:null,floors:40,status:"Planned",lat:32.0106,lng:34.7541},
{id:30,name:"Aviv BeGivatayim",city:"Givatayim",height:null,floors:25,status:"Planned",lat:32.07959,lng:34.80332},
{id:31,name:"Pro Medical Tower / ILDC 2",city:"Bnei Brak",height:110.0,floors:23,status:"Under Construction",lat:32.08458,lng:34.84304},
{id:32,name:"beresheet building by prashkovsky",city:"Rehovot",height:null,floors:16,status:"Unknown",lat:31.89427,lng:34.80886},
{id:33,name:"Jabotinsky Hadar E–B",city:"Ramat Gan",height:null,floors:60,status:"Proposed",lat:32.06366,lng:34.81447},
{id:34,name:"Sunset Tower",city:"Bat Yam",height:null,floors:20,status:"Topped Out",lat:32.01405,lng:34.75519},
{id:35,name:"Symphony Tower",city:"Holon",height:null,floors:25,status:"Topped Out",lat:32.02744,lng:34.78251},
{id:36,name:"Rachel–Rabin EB",city:"Givatayim",height:null,floors:30,status:"Proposed",lat:32.07873,lng:34.81963},
{id:37,name:"Jabotinsky Enav",city:"Ramat Gan",height:null,floors:50,status:"Approved",lat:32.07142,lng:34.82534},
{id:38,name:"Tidhar Giborim",city:"Bat Yam",height:null,floors:28,status:"Under Construction",lat:32.02181,lng:34.74106},
{id:39,name:"Achuzat Holon",city:"Holon",height:null,floors:23,status:"Topped Out",lat:32.0102,lng:34.79338},
{id:40,name:"Phoenix Campus",city:"Rishon LeZion",height:null,floors:10,status:"Topped Out",lat:31.96309,lng:34.7887},
{id:41,name:"Azrieli Palace Rakafot",city:"Rishon LeZion",height:null,floors:27,status:"Topped Out",lat:31.98378,lng:34.80391},
{id:42,name:"Landa and Vitania Campus",city:"Ness Ziona",height:null,floors:6,status:"Completed",lat:31.93567,lng:34.79833},
{id:43,name:"U Towers (Masada 2)",city:"Bat Yam",height:null,floors:34,status:"Planned",lat:32.02526,lng:34.74215},
{id:783,name:"U Towers (Masada 4)",city:"Bat Yam",height:null,floors:34,status:"Planned",lat:32.02526,lng:34.74215},
{id:44,name:"Weizmann Institute Student Housing",city:"Rehovot",height:null,floors:16,status:"Topped Out",lat:31.89254,lng:34.81647},
{id:45,name:"MORE Tabenkin Tower",city:"Givatayim",height:null,floors:45,status:"Approved",lat:32.06493,lng:34.80658},
{id:46,name:"Bat Yam Beach Hotel",city:"Bat Yam",height:141.0,floors:42,status:"Under Construction",lat:32.01232,lng:34.7378},
{id:47,name:"Aura Empire Tower",city:"Ramat Gan",height:130.0,floors:37,status:"Under Construction",lat:32.07831,lng:34.82752},
{id:48,name:"18 Jabotinsky",city:"Ramat Gan",height:null,floors:49,status:"Approved",lat:32.074,lng:34.81773},
{id:49,name:"AIR Givatayim",city:"Givatayim",height:null,floors:24,status:"Under Construction",lat:32.07269,lng:34.81745},
{id:50,name:"Inspire",city:"Petah Tikva",height:null,floors:20,status:"Planned",lat:32.08398,lng:34.88657},
{id:51,name:"Geula Triangle",city:"Petah Tikva",height:null,floors:13,status:"Proposed",lat:32.07967,lng:34.87679},
{id:52,name:"Carmel Winery",city:"Rishon LeZion",height:null,floors:44,status:"Approved",lat:31.96136,lng:34.7963},
{id:53,name:"Aura Ramat Hen (Tower 1)",city:"Ramat Gan",height:110.0,floors:30,status:"Topped Out",lat:32.07745,lng:34.81882},
{id:54,name:"Gindi Samuel",city:"Givat Shmuel",height:null,floors:22,status:"Approved",lat:32.08304,lng:34.85864},
{id:55,name:"G City",city:"Rishon LeZion",height:null,floors:34,status:"Topped Out",lat:31.97343,lng:34.79196},
{id:56,name:"Shitrit EB",city:"Petah Tikva",height:null,floors:33,status:"Proposed",lat:32.08312,lng:34.87787},
{id:57,name:"VICA Park",city:"Petah Tikva",height:null,floors:42,status:"Topped Out",lat:32.07881,lng:34.89309},
{id:58,name:"Sophy Towers (Tower II)",city:"Petah Tikva",height:null,floors:20,status:"Under Construction",lat:32.0745,lng:34.88331},
{id:59,name:"NEARO Towers (Tower 1)",city:"Petah Tikva",height:null,floors:25,status:"Topped Out",lat:32.09519,lng:34.89853},
{id:60,name:"Umami",city:"Kiryat Ono",height:105.0,floors:32,status:"Completed",lat:32.05918,lng:34.85614},
{id:61,name:"Maslavi Elite Towers",city:"Ramat Gan",height:100.0,floors:33,status:"Completed",lat:32.06797,lng:34.81556},
{id:62,name:"Electra Lifestyle 1000",city:"Rishon LeZion",height:null,floors:19,status:"Topped Out",lat:31.96826,lng:34.79848},
{id:63,name:"Ayala Towers",city:"Beer Yaakov",height:null,floors:18,status:"Completed",lat:31.93345,lng:34.8309},
{id:64,name:"93-101 Katzenelson",city:"Givatayim",height:null,floors:10,status:"Proposed",lat:32.08304,lng:34.82071},
{id:65,name:"Givat Shmuel City Gate",city:"Givat Shmuel",height:null,floors:29,status:"Topped Out",lat:32.08563,lng:34.85103},
{id:66,name:"The 5 - Katzenelson",city:"Bat Yam",height:null,floors:27,status:"Topped Out",lat:32.02612,lng:34.74215},
{id:67,name:"Gibor Tower",city:"Ramat Gan",height:null,floors:37,status:"Completed",lat:32.06711,lng:34.83187},
{id:68,name:"HaHayal HaAlmoni",city:"Rishon LeZion",height:null,floors:40,status:"Approved",lat:31.9674,lng:34.78978},
{id:69,name:"Sea Park",city:"Bat Yam",height:null,floors:30,status:"Topped Out",lat:32.01319,lng:34.7378},
{id:70,name:"Icon Tower",city:"Ramat Gan",height:130.0,floors:30,status:"Completed",lat:32.07918,lng:34.82752},
{id:71,name:"Hegefen-Hatikva Tower",city:"Ramat Gan",height:null,floors:18,status:"Proposed",lat:32.07487,lng:34.81773},
{id:72,name:"Highline 3",city:"Ramat Gan",height:null,floors:22,status:"Under Construction",lat:32.07056,lng:34.83295},
{id:73,name:"Dan Center (BBC Central Tower)",city:"Bnei Brak",height:187.0,floors:44,status:"Completed",lat:32.07854,lng:34.83217},
{id:74,name:"Ela Yam (fmr. Swissotel / Sun Hotel)",city:"Bat Yam",height:null,floors:27,status:"Topped Out",lat:32.01663,lng:34.73889},
{id:75,name:"Solo (HaHistadrut 80)",city:"Holon",height:null,floors:28,status:"Planned",lat:32.00502,lng:34.7912},
{id:76,name:"Denmark Complex",city:"Petah Tikva",height:null,floors:22,status:"Approved",lat:32.09691,lng:34.88222},
{id:77,name:"Baron Towers (Tower 1)",city:"Petah Tikva",height:null,floors:22,status:"Completed",lat:32.0926,lng:34.89744},
{id:78,name:"Inno",city:"Kiryat Ono",height:null,floors:17,status:"Proposed",lat:32.05659,lng:34.85506},
{id:79,name:"HaMerkava office complex",city:"Holon",height:null,floors:25,status:"Under Construction",lat:32.01278,lng:34.77707},
{id:80,name:"Jabotinsky-Yosefi EB",city:"Ramat Gan",height:null,floors:30,status:"Planned",lat:32.06107,lng:34.82969},
{id:81,name:"Metro City Hall HeHatzav",city:"Petah Tikva",height:null,floors:9,status:"Proposed",lat:32.07536,lng:34.88331},
{id:82,name:"Jabotinsky-HaMatmid-Le\'an EB",city:"Ramat Gan",height:null,floors:11,status:"Proposed",lat:32.07745,lng:34.83513},
{id:83,name:"Shalev BaSdera",city:"Ramat Gan",height:null,floors:45,status:"Approved",lat:32.07314,lng:34.82534},
{id:84,name:"Bezalel towers",city:"Ramat Gan",height:null,floors:90,status:"Proposed",lat:32.06883,lng:34.81556},
{id:85,name:"Moment Bat Yam",city:"Bat Yam",height:null,floors:36,status:"Topped Out",lat:32.01922,lng:34.75628},
{id:86,name:"Avnat Tower 2",city:"Petah Tikva",height:null,floors:30,status:"Proposed",lat:32.07881,lng:34.8844},
{id:87,name:"Odis Complex",city:"Petah Tikva",height:null,floors:30,status:"Approved",lat:32.0745,lng:34.89961},
{id:88,name:"Eshed Igra Complex",city:"Petah Tikva",height:null,floors:40,status:"Approved",lat:32.09519,lng:34.88983},
{id:89,name:"Krinitsi Nahalat Yosef",city:"Ramat Gan",height:null,floors:11,status:"Approved",lat:32.07228,lng:34.81665},
{id:90,name:"Ben Gurion HaRo\'e EB",city:"Ramat Gan",height:null,floors:10,status:"Approved",lat:32.06797,lng:34.83187},
{id:91,name:"Millennia",city:"Rishon LeZion",height:null,floors:22,status:"Completed",lat:31.96826,lng:34.78978},
{id:92,name:"Wiin Towers (Fichman Holon) (Tower 1)",city:"Holon",height:97.0,floors:26,status:"Topped Out",lat:32.00675,lng:34.7749},
{id:93,name:"Cinema Heichal EB",city:"Petah Tikva",height:null,floors:25,status:"Approved",lat:32.09864,lng:34.89092},
{id:94,name:"Benjamin Tower",city:"Ramat Gan",height:null,floors:19,status:"Planned",lat:32.07573,lng:34.81773},
{id:95,name:"IDE Tower frmr 120",city:"Ramat Gan",height:520.0,floors:120,status:"Proposed",lat:32.07142,lng:34.83295},
{id:832,name:"Ayalon Tower",city:"Ramat Gan",height:130.0,floors:35,status:"Completed",lat:32.0698,lng:34.8213},
{id:96,name:"Jabotinsky-Herzl",city:"Ramat Gan",height:null,floors:48,status:"Proposed",lat:32.06711,lng:34.82317},
{id:97,name:"The Phoenix Art",city:"Bnei Brak",height:null,floors:27,status:"Completed",lat:32.0751,lng:34.82239},
{id:98,name:"30 Hapodim",city:"Ramat Gan",height:null,floors:20,status:"Completed",lat:32.05849,lng:34.8286},
{id:99,name:"Academy Tower",city:"Petah Tikva",height:null,floors:27,status:"Topped Out",lat:32.09778,lng:34.88222},
{id:100,name:"Shoham Tower",city:"Ramat Gan",height:null,floors:40,status:"Approved",lat:32.07487,lng:34.83404},
{id:101,name:"Dan Diamond",city:"Ramat Gan",height:null,floors:90,status:"Proposed",lat:32.07056,lng:34.82426},
{id:102,name:"Homeplex Rehovot",city:"Rehovot",height:null,floors:17,status:"Planned",lat:31.89254,lng:34.79907},
{id:103,name:"Luxembourg Tower",city:"Bnei Brak",height:null,floors:20,status:"Approved",lat:32.07423,lng:34.83869},
{id:104,name:"Armonot Park HaYam",city:"Bat Yam",height:null,floors:21,status:"Approved",lat:32.01232,lng:34.74541},
{id:105,name:"C One",city:"Bat Yam",height:null,floors:35,status:"Under Construction",lat:32.03301,lng:34.76063},
{id:106,name:"HaKhilazon",city:"Ramat Gan",height:null,floors:60,status:"Proposed",lat:32.074,lng:34.82534},
{id:107,name:"Azar Center",city:"Ramat Gan",height:null,floors:31,status:"Approved",lat:32.06969,lng:34.81556},
{id:108,name:"Hi Tower",city:"Givatayim",height:220.0,floors:57,status:"Completed",lat:32.06838,lng:34.81528},
{id:109,name:"Yitzhak Sadeh E–B",city:"Petah Tikva",height:null,floors:33,status:"Approved",lat:32.07967,lng:34.8844},
{id:110,name:"Merkavim",city:"Petah Tikva",height:null,floors:40,status:"Proposed",lat:32.07536,lng:34.89961},
{id:111,name:"Bayit BaPark Complex",city:"Or Yehuda",height:null,floors:8,status:"Topped Out",lat:32.04235,lng:34.85163},
{id:112,name:"Colomb Complex",city:"Givatayim",height:null,floors:18,status:"Proposed",lat:32.07614,lng:34.80115},
{id:113,name:"Jaffa Bat Yam",city:"Bat Yam",height:null,floors:28,status:"Planned",lat:32.02353,lng:34.75737},
{id:114,name:"WAVE Givat Shmuel (Tower 1)",city:"Givat Shmuel",height:null,floors:23,status:"Topped Out",lat:32.07442,lng:34.84668},
{id:115,name:"Herzl–Bialik E–B",city:"Rishon LeZion",height:null,floors:50,status:"Approved",lat:31.96481,lng:34.78},
{id:116,name:"BSR Shaar HaYam (AKA Northern City Gate Towers + Bilu )",city:"Bat Yam",height:null,floors:40,status:"Planned",lat:32.0106,lng:34.75302},
{id:117,name:"Rothschild Arlozorov",city:"Bat Yam",height:null,floors:26,status:"Proposed",lat:32.03129,lng:34.74323},
{id:118,name:"Rothschild Bat Yam",city:"Bat Yam",height:null,floors:39,status:"Planned",lat:32.02698,lng:34.75845},
{id:119,name:"Balfour 81",city:"Bat Yam",height:null,floors:26,status:"Planned",lat:32.02267,lng:34.74867},
{id:120,name:"YRD",city:"Ramat Gan",height:null,floors:28,status:"Approved",lat:32.06366,lng:34.81339},
{id:121,name:"HaTotchanim EB",city:"Holon",height:null,floors:40,status:"Approved",lat:32.00675,lng:34.7912},
{id:122,name:"BYC (Binyamini Complex)",city:"Bat Yam",height:null,floors:47,status:"Planned",lat:32.03474,lng:34.74432},
{id:123,name:"Balfour–Heftman E–B",city:"Bat Yam",height:null,floors:36,status:"Proposed",lat:32.03043,lng:34.75954},
{id:124,name:"HaRav Kokis Street VB",city:"Bat Yam",height:null,floors:36,status:"Planned",lat:32.02612,lng:34.74976},
{id:125,name:"B Towers (Tower 1)",city:"Bat Yam",height:null,floors:47,status:"On Hold",lat:32.02181,lng:34.73997},
{id:126,name:"Nxt Park Hayam",city:"Bat Yam",height:null,floors:25,status:"Completed",lat:32.0175,lng:34.75519},
{id:127,name:"Rosh Pina 5-23",city:"Holon",height:null,floors:10,status:"Planned",lat:32.00589,lng:34.78251},
{id:128,name:"HaHistadrut 104-106 EB",city:"Holon",height:null,floors:40,status:"Planned",lat:32.02658,lng:34.79773},
{id:129,name:"Rosh Pina 113 EB",city:"Holon",height:null,floors:40,status:"Planned",lat:32.02227,lng:34.78794},
{id:130,name:"Yuvalim Park HaYam",city:"Bat Yam",height:null,floors:34,status:"Planned",lat:32.02526,lng:34.74106},
{id:131,name:"Kaf Tet Benovember",city:"Bat Yam",height:null,floors:37,status:"Approved",lat:32.02094,lng:34.75628},
{id:132,name:"Minute Bat Yam",city:"Bat Yam",height:null,floors:17,status:"Approved",lat:32.01663,lng:34.7465},
{id:133,name:"Dakar Compound VB",city:"Bat Yam",height:null,floors:18,status:"Proposed",lat:32.01232,lng:34.76171},
{id:134,name:"Yoseftal Kiriyati",city:"Bat Yam",height:null,floors:46,status:"Proposed",lat:32.03301,lng:34.75193},
{id:135,name:"Garden Towers (Tower 1)",city:"Bat Yam",height:null,floors:30,status:"Marketing",lat:32.0287,lng:34.74215},
{id:136,name:"Yoseftal - Bar Ilan",city:"Bat Yam",height:null,floors:22,status:"Proposed",lat:32.02439,lng:34.75737},
{id:137,name:"Basel Park",city:"Petah Tikva",height:null,floors:27,status:"Topped Out",lat:32.08398,lng:34.88548},
{id:138,name:"Gissin Park",city:"Petah Tikva",height:null,floors:26,status:"Completed",lat:32.07967,lng:34.8757},
{id:139,name:"Medicity",city:"Petah Tikva",height:null,floors:38,status:"Planned",lat:32.07536,lng:34.89092},
{id:140,name:"Brizo Park HaYam",city:"Bat Yam",height:null,floors:22,status:"Topped Out",lat:32.03215,lng:34.74323},
{id:141,name:"Savyon VB",city:"Or Yehuda",height:null,floors:17,status:"Topped Out",lat:32.03804,lng:34.85815},
{id:142,name:"Azrieli Rishonim Center",city:"Rishon LeZion",height:null,floors:20,status:"Completed",lat:31.97343,lng:34.79087},
{id:143,name:"Lighthouse/Previous name YBOX Bat Yam",city:"Bat Yam",height:164.0,floors:49,status:"Completed",lat:32.01922,lng:34.73889},
{id:144,name:"Sea Hotel",city:"Bat Yam",height:90.0,floors:25,status:"Under Construction",lat:32.01491,lng:34.7541},
{id:145,name:"Jasmin",city:"Givatayim",height:null,floors:30,status:"Planned",lat:32.0589,lng:34.80332},
{id:146,name:"Dimri Schindler",city:"Bat Yam",height:null,floors:25,status:"Approved",lat:32.03129,lng:34.75954},
{id:147,name:"Aura Imagine",city:"Givatayim",height:null,floors:35,status:"Approved",lat:32.07528,lng:34.80876},
{id:148,name:"Only Givatayim",city:"Givatayim",height:null,floors:25,status:"Under Construction",lat:32.07097,lng:34.79897},
{id:149,name:"Y Town",city:"Rishon LeZion",height:null,floors:27,status:"Under Construction",lat:31.96826,lng:34.79739},
{id:150,name:"Herzl 41 - 45",city:"Bat Yam",height:null,floors:23,status:"Planned",lat:32.01405,lng:34.74541},
{id:151,name:"Nir Nahum Complex (Tower 1)",city:"Bat Yam",height:null,floors:40,status:"Planned",url:"https://www.skyscrapercity.com/threads/bat-yam-nir-nahum-complex-3-x-40-fl-planned.2387414/",lat:32.03474,lng:34.76063},
{id:943,name:"Nir Nahum Complex (Tower 2)",city:"Bat Yam",height:null,floors:40,status:"Planned",url:"https://www.skyscrapercity.com/threads/bat-yam-nir-nahum-complex-3-x-40-fl-planned.2387414/",lat:32.03474,lng:34.76063},
{id:944,name:"Nir Nahum Complex (Tower 3)",city:"Bat Yam",height:null,floors:40,status:"Planned",url:"https://www.skyscrapercity.com/threads/bat-yam-nir-nahum-complex-3-x-40-fl-planned.2387414/",lat:32.03474,lng:34.76063},
{id:152,name:"Metro Towers Bat Yam (Tower 1)",city:"Bat Yam",height:null,floors:24,status:"Approved",lat:32.03043,lng:34.75084},
{id:153,name:"Unik Cardo (Tower 1)",city:"Rishon LeZion",height:null,floors:25,status:"Under Construction",lat:31.97602,lng:34.78326},
{id:154,name:"Alfa Rishon LeZion (Tower 1)",city:"Rishon LeZion",height:null,floors:18,status:"Under Construction",lat:31.97171,lng:34.79848},
{id:155,name:"Dona Top",city:"Ramla",height:null,floors:24,status:"Under Construction",lat:31.922,lng:34.8587},
{id:156,name:"Bursa Parking Lot Tower",city:"Ramat Gan",height:500.0,floors:null,status:"Proposed",lat:32.05849,lng:34.83621},
{id:157,name:"Sea Tower 4",city:"Bat Yam",height:null,floors:25,status:"Marketing",lat:32.03388,lng:34.75193},
{id:158,name:"Shalem complex",city:"Ramat Gan",height:null,floors:24,status:"Proposed",lat:32.07487,lng:34.81665},
{id:159,name:"Orlov Complex (Tower 1)",city:"Petah Tikva",height:null,floors:28,status:"Proposed",url:"https://www.skyscrapercity.com/threads/petah-tikva-orlov-complex-2-x-28-fl-17-fl-prop.2443449/",lat:32.08916,lng:34.89527},
{id:945,name:"Orlov Complex (Tower 2)",city:"Petah Tikva",height:null,floors:28,status:"Proposed",url:"https://www.skyscrapercity.com/threads/petah-tikva-orlov-complex-2-x-28-fl-17-fl-prop.2443449/",lat:32.08916,lng:34.89527},
{id:946,name:"Orlov Complex (Tower 3)",city:"Petah Tikva",height:null,floors:17,status:"Proposed",url:"https://www.skyscrapercity.com/threads/petah-tikva-orlov-complex-2-x-28-fl-17-fl-prop.2443449/",lat:32.08916,lng:34.89527},
{id:160,name:"Bar Kochva Complex",city:"Petah Tikva",height:null,floors:15,status:"Proposed",lat:32.08484,lng:34.88548},
{id:161,name:"Geulim",city:"Holon",height:null,floors:40,status:"Proposed",lat:32.00933,lng:34.7749},
{id:162,name:"Museum Tower",city:"Ramat Gan",height:null,floors:43,status:"Proposed",lat:32.05762,lng:34.82752},
{id:163,name:"Ha\'Amal - HaYogev - Museum EB",city:"Ramat Gan",height:null,floors:24,status:"Approved",lat:32.07831,lng:34.81773},
{id:164,name:"Shuster Nahalat Ganim",city:"Ramat Gan",height:null,floors:8,status:"Completed",lat:32.074,lng:34.83295},
{id:165,name:"Park Tower (Aba Hillel-HaMavdil EB)",city:"Ramat Gan",height:null,floors:34,status:"Planned",lat:32.06969,lng:34.82317},
{id:166,name:"HaGra EB",city:"Holon",height:null,floors:35,status:"Proposed",lat:32.01278,lng:34.77599},
{id:167,name:"35 Shalem",city:"Ramat Gan",height:null,floors:15,status:"Proposed",lat:32.06107,lng:34.8286},
{id:168,name:"Israel–Canada Tower (Eurocom Tower)",city:"Ramat Gan",height:250.0,floors:65,status:"Approved",lat:32.05676,lng:34.81882},
{id:169,name:"Unik Cardo Nachalat Yehuda (Tower 1)",city:"Rishon LeZion",height:null,floors:24,status:"Under Construction",lat:31.98205,lng:34.80174},
{id:170,name:"Aura Link",city:"Yehud Monosson",height:null,floors:15,status:"Under Construction",lat:32.03804,lng:34.88276},
{id:171,name:"Savyon Junction Complex",city:"Kiryat Ono",height:null,floors:20,status:"Proposed",lat:32.05573,lng:34.84527},
{id:172,name:"Electra Givat Shmuel",city:"Givat Shmuel",height:null,floors:22,status:"Under Construction",lat:32.07442,lng:34.85429},
{id:173,name:"Anski EB",city:"Petah Tikva",height:null,floors:37,status:"Approved",lat:32.07881,lng:34.88331},
{id:174,name:"40-44 Katsenelson",city:"Petah Tikva",height:null,floors:20,status:"Approved",lat:32.0745,lng:34.89853},
{id:175,name:"The KKL Residences (JNF)",city:"Bat Yam",height:null,floors:30,status:"Proposed",lat:32.03129,lng:34.75084},
{id:176,name:"Sharonim Towers (Tower 1)",city:"Petah Tikva",height:null,floors:25,status:"Marketing",lat:32.09088,lng:34.87896},
{id:177,name:"Azor Zarfati",city:"Azor",height:null,floors:23,status:"Under Construction",lat:32.02267,lng:34.80928},
{id:178,name:"Savyon Ramat Gan V-B",city:"Ramat Gan",height:null,floors:53,status:"Proposed",lat:32.06366,lng:34.821},
{id:179,name:"Savyon Jabotinsky E-B",city:"Ramat Gan",height:null,floors:50,status:"Proposed",lat:32.05935,lng:34.83621},
{id:180,name:"Siv Park",city:"Petah Tikva",height:null,floors:17,status:"Completed",lat:32.09864,lng:34.88983},
{id:181,name:"Orek and Oz House",city:"Ramat Gan",height:null,floors:60,status:"Proposed",lat:32.07573,lng:34.81665},
{id:182,name:"Metropark",city:"Givat Shmuel",height:null,floors:45,status:"Proposed",lat:32.08132,lng:34.85647},
{id:183,name:"37th Bialik St.",city:"Ramat Gan",height:null,floors:38,status:"Approved",lat:32.06711,lng:34.82208},
{id:184,name:"Start Towers",city:"Beer Yaakov",height:null,floors:25,status:"Under Construction",lat:31.9369,lng:34.8222},
{id:185,name:"21-25 HaPodim",city:"Ramat Gan",height:null,floors:10,status:"Proposed",lat:32.05849,lng:34.82752},
{id:186,name:"Zarfati Selected (Tower 1)",city:"Rishon LeZion",height:null,floors:31,status:"Under Construction",lat:31.98378,lng:34.78543},
{id:187,name:"Etos Towers (Tower 1)",city:"Petah Tikva",height:null,floors:18,status:"Under Construction",lat:32.09347,lng:34.89635},
{id:188,name:"Maarava",city:"Rehovot",height:null,floors:10,status:"Under Construction",lat:31.89686,lng:34.80777},
{id:189,name:"Arlozorov HaMatmid Simcha EB",city:"Ramat Gan",height:null,floors:19,status:"Approved",lat:32.06624,lng:34.81339},
{id:190,name:"NEO BaGivah",city:"Givat Shmuel",height:null,floors:15,status:"Topped Out",lat:32.07183,lng:34.8532},
{id:191,name:"Beresheet EB",city:"Givatayim",height:null,floors:30,status:"Approved",lat:32.06062,lng:34.80332},
{id:192,name:"Gindi Azar",city:"Ramat Gan",height:null,floors:34,status:"Under Construction",lat:32.07831,lng:34.83404},
{id:193,name:"Avgad Teo (Tower 1)",city:"Ramla",height:null,floors:25,status:"Under Construction",lat:31.9332,lng:34.86196},
{id:194,name:"Solomon Towers (Tower 2)",city:"Rishon LeZion",height:null,floors:11,status:"Approved",lat:31.97429,lng:34.78217},
{id:195,name:"HaHistadrut–Shenkar E–B",city:"Holon",height:null,floors:40,status:"Approved",lat:32.01278,lng:34.79229},
{id:196,name:"2 Hayetsira",city:"Ramat Gan",height:null,floors:50,status:"Approved",lat:32.06107,lng:34.81991},
{id:197,name:"Liberty",city:"Kiryat Ono",height:null,floors:null,status:"Under Construction",lat:32.04366,lng:34.86593},
{id:198,name:"Dream Tower VB",city:"Bat Yam",height:null,floors:37,status:"Completed",lat:32.03215,lng:34.75084},
{id:199,name:"Enav Bar Kochva",city:"Bnei Brak",height:null,floors:58,status:"Approved",lat:32.08544,lng:34.82456},
{id:200,name:"Rupin-Motskin EB",city:"Petah Tikva",height:null,floors:18,status:"Approved",lat:32.08743,lng:34.89418},
{id:201,name:"Jabotinsky–Kaplan E–B",city:"Petah Tikva",height:null,floors:34,status:"Approved",lat:32.08312,lng:34.8844},
{id:202,name:"19 Jabotinsky",city:"Petah Tikva",height:null,floors:11,status:"Approved",lat:32.07881,lng:34.89961},
{id:203,name:"Schiller Compound (Tower 1)",city:"Petah Tikva",height:null,floors:27,status:"Approved",url:"https://www.skyscrapercity.com/threads/petah-tikva-schiller-compound-2x27-fl-approved.2378739/",lat:32.0745,lng:34.88983},
{id:958,name:"Schiller Compound (Tower 2)",city:"Petah Tikva",height:null,floors:27,status:"Approved",url:"https://www.skyscrapercity.com/threads/petah-tikva-schiller-compound-2x27-fl-approved.2378739/",lat:32.0745,lng:34.88983},
{id:204,name:"HaBiluim Complex",city:"Ramat Gan",height:null,floors:16,status:"Approved",lat:32.07659,lng:34.81665},
{id:205,name:"Yoseftal Gate Masterplan",city:"Bat Yam",height:null,floors:59,status:"Approved",lat:32.02698,lng:34.75737},
{id:206,name:"Tse\'elim Complex",city:"Holon",height:null,floors:30,status:"Proposed",lat:32.01537,lng:34.78468},
{id:207,name:"Sofer - Ben Zur HaRishonim Tower",city:"Ramat Gan",height:null,floors:38,status:"Approved",lat:32.06366,lng:34.8123},
{id:208,name:"Clal Korazin Tower",city:"Givatayim",height:null,floors:40,status:"Approved",lat:32.06235,lng:34.81202},
{id:209,name:"LYFE Towers, fmr Dan Towers (Tower C)",city:"Bnei Brak",height:null,floors:50,status:"On Hold",lat:32.09234,lng:34.82673},
{id:210,name:"Yalin Yafe Tower",city:"Rehovot",height:null,floors:15,status:"Topped Out",lat:31.90203,lng:34.81755},
{id:211,name:"Metro Tower (fmr. Ahdut)",city:"Ramat Gan",height:null,floors:36,status:"Completed",lat:32.07142,lng:34.82317},
{id:212,name:"Neo Sea Bat Yam",city:"Bat Yam",height:null,floors:28,status:"Marketing",lat:32.02181,lng:34.73889},
{id:213,name:"Paz Rama Tower",city:"Ramat Gan",height:null,floors:35,status:"Planned",lat:32.0628,lng:34.8286},
{id:214,name:"Noga Square",city:"Givatayim",height:null,floors:40,status:"Proposed",lat:32.06149,lng:34.80332},
{id:215,name:"Dalia Complex",city:"Bat Yam",height:null,floors:10,status:"Approved",lat:32.03388,lng:34.75954},
{id:216,name:"Bialik Towers",city:"Ramat Gan",height:null,floors:43,status:"Proposed",lat:32.07487,lng:34.82426},
{id:217,name:"Beit Cal",city:"Givatayim",height:null,floors:40,status:"Proposed",lat:32.07356,lng:34.79897},
{id:218,name:"Neve Yehoshua EB",city:"Ramat Gan",height:null,floors:26,status:"Approved",lat:32.06624,lng:34.82969},
{id:219,name:"Bass tower",city:"Ramat Gan",height:null,floors:55,status:"Approved",lat:32.06193,lng:34.81991},
{id:220,name:"Achuzat Rupin EB",city:"Petah Tikva",height:null,floors:32,status:"Approved",lat:32.07622,lng:34.89853},
{id:221,name:"Orlov Maccabim",city:"Petah Tikva",height:null,floors:31,status:"Approved",lat:32.09691,lng:34.88874},
{id:222,name:"Gefen–Carasso Tower",city:"Petah Tikva",height:null,floors:30,status:"Approved",lat:32.0926,lng:34.87896},
{id:223,name:"13–15 Uziel Street E–B (Kardan Uziel)",city:"Ramat Gan",height:null,floors:21,status:"Planned",lat:32.06969,lng:34.83078},
{id:224,name:"Blue on the Sea Hotel",city:"Bat Yam",height:null,floors:14,status:"Proposed",lat:32.02008,lng:34.7465},
{id:225,name:"Yam towers, frmr Minrav Yam (Tower 1)",city:"Bat Yam",height:115.0,floors:33,status:"Completed",lat:32.01577,lng:34.76171},
{id:226,name:"Herzl-Ya\'akov EB",city:"Rehovot",height:null,floors:22,status:"Proposed",lat:31.88306,lng:34.81103},
{id:227,name:"Enav New",city:"Ramat Gan",height:null,floors:21,status:"Under Construction",lat:32.07745,lng:34.81665},
{id:228,name:"Colony Beach (New wing)",city:"Bat Yam",height:null,floors:36,status:"Planned",lat:32.02784,lng:34.75737},
{id:229,name:"Overall Renewal Master Plan",city:"Bat Yam",height:null,floors:50,status:"Proposed",lat:32.02353,lng:34.74758},
{id:230,name:"HaNevi\'im 53",city:"Bat Yam",height:null,floors:20,status:"Planned",lat:32.01922,lng:34.7378},
{id:231,name:"Studio Tower",city:"Bnei Brak",height:null,floors:19,status:"Completed",lat:32.07251,lng:34.83652},
{id:232,name:"Land Rover – Jaguar Tower (Moshe Dayan 6)",city:"Petah Tikva",height:null,floors:28,status:"On Hold",lat:32.0745,lng:34.88113},
{id:233,name:"Efal 33",city:"Petah Tikva",height:null,floors:39,status:"Under Construction",lat:32.09519,lng:34.89635},
{id:234,name:"The Eye (Givat Rambam - Ha\'Ayin EB)",city:"Givatayim",height:null,floors:10,status:"Proposed",lat:32.07528,lng:34.80767},
{id:235,name:"HaZeitim EB",city:"Ramat Gan",height:null,floors:28,status:"Proposed",lat:32.06797,lng:34.81339},
{id:236,name:"Hogi One (Matalon Tower)",city:"Petah Tikva",height:null,floors:23,status:"Completed",lat:32.08226,lng:34.892},
{id:237,name:"BSR CITY (Tower 1)",city:"Petah Tikva",height:125.0,floors:32,status:"Completed",lat:32.07795,lng:34.88222},
{id:790,name:"BSR CITY (Tower 2)",city:"Petah Tikva",height:125.0,floors:32,status:"Completed",lat:32.07795,lng:34.88222},
{id:791,name:"BSR CITY (Tower 3)",city:"Petah Tikva",height:125.0,floors:32,status:"Completed",lat:32.07795,lng:34.88222},
{id:792,name:"BSR CITY (Tower 4)",city:"Petah Tikva",height:125.0,floors:32,status:"Completed",lat:32.07795,lng:34.88222},
{id:238,name:"One Tower",city:"Ramat Gan",height:160.0,floors:36,status:"Completed",lat:32.08004,lng:34.83404},
{id:808,name:"Leonardo City Tower",city:"Ramat Gan",height:157.0,floors:37,status:"Completed",lat:32.07871,lng:34.82977},
{id:239,name:"Rabbi Akiva-Bar Kochva EB",city:"Holon",height:null,floors:27,status:"Approved",lat:32.02313,lng:34.78686},
{id:240,name:"AvGad Aba Hillel",city:"Ramat Gan",height:null,floors:28,status:"Approved",lat:32.07142,lng:34.81447},
{id:241,name:"Rabbi Akiva EB",city:"Holon",height:null,floors:25,status:"Approved",lat:32.01451,lng:34.79229},
{id:242,name:"Balfour Rothschild EB",city:"Bat Yam",height:null,floors:null,status:"Proposed",lat:32.0175,lng:34.74541},
{id:243,name:"B.S.R Rishonim",city:"Rishon LeZion",height:null,floors:20,status:"Completed",lat:31.96309,lng:34.80283},
{id:244,name:"HaRokmim EB",city:"Holon",height:null,floors:26,status:"Approved",lat:32.02658,lng:34.78794},
{id:245,name:"Gan HaIr Tower",city:"Bat Yam",height:null,floors:35,status:"Planned",lat:32.02957,lng:34.74106},
{id:246,name:"Amraz",city:"Rishon LeZion",height:null,floors:9,status:"Proposed",lat:31.97516,lng:34.79848},
{id:247,name:"Arlozorov 46-48",city:"Bat Yam",height:null,floors:17,status:"Planned",lat:32.02094,lng:34.7465},
{id:248,name:"7 Stars tower, frmr Argaman Tower / ILDC 3",city:"Bnei Brak",height:211.0,floors:52,status:"Completed",lat:32.07423,lng:34.84521},
{id:249,name:"Prof. Shor HaPeled EB",city:"Holon",height:null,floors:15,status:"Approved",lat:32.00502,lng:34.78903},
{id:250,name:"Aba Hillel Rokach Herut EB",city:"Ramat Gan",height:null,floors:35,status:"Approved",lat:32.07831,lng:34.81665},
{id:251,name:"Ramat Yosef",city:"Bat Yam",height:null,floors:32,status:"Planned",lat:32.0287,lng:34.75737},
{id:252,name:"Yoseftal 55",city:"Bat Yam",height:null,floors:36,status:"Approved",lat:32.02439,lng:34.74758},
{id:253,name:"Life Tower",city:"Bat Yam",height:null,floors:37,status:"Under Construction",lat:32.02008,lng:34.7378},
{id:254,name:"DavidSea Tower",city:"Bat Yam",height:null,floors:40,status:"Topped Out",lat:32.01577,lng:34.75302},
{id:255,name:"Highline towers (formerly HaMatmid Towers) (Tower 1)",city:"Ramat Gan",height:106.0,floors:30,status:"Completed",lat:32.05676,lng:34.81773},
{id:256,name:"HaTikva-Ma\'ale HaShoeva EB",city:"Ramat Gan",height:null,floors:35,status:"Approved",lat:32.07745,lng:34.83295},
{id:257,name:"Aba Hillel Herut VB",city:"Ramat Gan",height:null,floors:30,status:"Approved",lat:32.07314,lng:34.82317},
{id:258,name:"Baladi Towers (Baladi 1)",city:"Bat Yam",height:155.0,floors:44,status:"Under Construction",lat:32.02353,lng:34.73889},
{id:838,name:"Baladi Towers (Baladi 2a)",city:"Bat Yam",height:null,floors:33,status:"Under Construction",lat:32.02353,lng:34.73889},
{id:839,name:"Baladi Towers (Baladi 2b)",city:"Bat Yam",height:null,floors:13,status:"Under Construction",lat:32.02353,lng:34.73889},
{id:259,name:"Jabotinsky Le\'an",city:"Ramat Gan",height:null,floors:20,status:"Proposed",lat:32.06452,lng:34.8286},
{id:260,name:"Matzlawi Elite Office Tower",city:"Ramat Gan",height:null,floors:41,status:"Approved",lat:32.06021,lng:34.81882},
{id:261,name:"Kheil HaShiryon EB",city:"Rishon LeZion",height:null,floors:10,status:"Proposed",lat:31.9605,lng:34.80174},
{id:262,name:"Ganei Arlozorov",city:"Ramat Gan",height:null,floors:22,status:"Proposed",lat:32.07659,lng:34.82426},
{id:263,name:"Diamond Tower (15 Efal)",city:"Petah Tikva",height:null,floors:30,status:"Approved",lat:32.09088,lng:34.87787},
{id:264,name:"Olive Tree Compound",city:"Petah Tikva",height:null,floors:44,status:"Proposed",lat:32.08657,lng:34.89309},
{id:265,name:"HaTsela EB",city:"Ramat Gan",height:null,floors:28,status:"Approved",lat:32.06366,lng:34.81991},
{id:266,name:"HaNevi\'im-Rabinovich Project",city:"Bat Yam",height:null,floors:35,status:"Planned",lat:32.01405,lng:34.76063},
{id:267,name:"Eldar Tower",city:"Bnei Brak",height:null,floors:50,status:"Planned",lat:32.09234,lng:34.83434},
{id:268,name:"HaYetsira Tower",city:"Petah Tikva",height:null,floors:30,status:"Planned",lat:32.09433,lng:34.87896},
{id:269,name:"Tirza-Molcho-Yerushalayim EB",city:"Ramat Gan",height:null,floors:23,status:"Approved",lat:32.07142,lng:34.83078},
{id:270,name:"HaLavi EB",city:"Givatayim",height:null,floors:27,status:"Approved",lat:32.07011,lng:34.8055},
{id:271,name:"Talpiot Towers (Tower 2)",city:"Ramat Gan",height:null,floors:15,status:"Proposed",lat:32.0628,lng:34.83621},
{id:272,name:"Atzmaut - Balfour E-B",city:"Bat Yam",height:null,floors:35,status:"Planned",lat:32.01319,lng:34.75193},
{id:273,name:"20 Masada",city:"Bnei Brak",height:null,floors:30,status:"Proposed",lat:32.09148,lng:34.82565},
{id:274,name:"Shenhav Tower",city:"Bat Yam",height:null,floors:22,status:"Approved",lat:32.02957,lng:34.75737},
{id:275,name:"Efal Tower",city:"Petah Tikva",height:null,floors:26,status:"Planned",lat:32.08916,lng:34.88548},
{id:276,name:"Ofer Park Tower",city:"Petah Tikva",height:null,floors:31,status:"Proposed",lat:32.08484,lng:34.8757},
{id:277,name:"Sarfati Sea&Park",city:"Bat Yam",height:null,floors:25,status:"Under Construction",lat:32.01663,lng:34.75302},
{id:278,name:"Balfour 165 Tower",city:"Bat Yam",height:120.0,floors:35,status:"Under Construction",lat:32.01232,lng:34.74323},
{id:279,name:"Zeituni Park HaYam",city:"Bat Yam",height:null,floors:30,status:"Topped Out",lat:32.03301,lng:34.75845},
{id:280,name:"The Lake",city:"Ramat Gan",height:null,floors:16,status:"Topped Out",lat:32.074,lng:34.82317},
{id:281,name:"Mediport",city:"Ramat Gan",height:null,floors:16,status:"Approved",lat:32.06969,lng:34.81339},
{id:282,name:"Bialik Yeda Am",city:"Ramat Gan",height:null,floors:36,status:"Approved",lat:32.06538,lng:34.8286},
{id:283,name:"Echad Ha\'Am EB",city:"Ramat Gan",height:null,floors:22,status:"Approved",lat:32.06107,lng:34.81882},
{id:284,name:"Yitzhak Sadeh 34",city:"Petah Tikva",height:null,floors:20,status:"Under Construction",lat:32.07536,lng:34.89744},
{id:285,name:"Avnat Mall Tower & Prima Hotel",city:"Petah Tikva",height:50.0,floors:17,status:"Completed",lat:32.09605,lng:34.88766},
{id:286,name:"Panorama Park HaYam",city:"Bat Yam",height:null,floors:31,status:"Completed",lat:32.02784,lng:34.73997},
{id:287,name:"Savyonei Givat Shmuel",city:"Givat Shmuel",height:null,floors:18,status:"Under Construction",lat:32.07873,lng:34.85429},
{id:288,name:"Yaakobi Y Garden / Y Premium",city:"Petah Tikva",height:null,floors:19,status:"Under Construction",lat:32.08312,lng:34.88331},
{id:289,name:"Rotman Tower",city:"Rehovot",height:null,floors:16,status:"Topped Out",lat:31.88651,lng:34.81973},
{id:290,name:"Shop Time Tower",city:"Petah Tikva",height:145.0,floors:35,status:"Approved",lat:32.0745,lng:34.88874},
{id:291,name:"BioTech Valley Center",city:"Ramat Gan",height:null,floors:20,status:"Approved",lat:32.07659,lng:34.81556},
{id:292,name:"Malki E Tower",city:"Bat Yam",height:null,floors:19,status:"Approved",lat:32.02698,lng:34.75628},
{id:293,name:"Lev Ha\'Ir EB",city:"Petah Tikva",height:null,floors:null,status:"Proposed",lat:32.08657,lng:34.8844},
{id:294,name:"Rozio HaPodim",city:"Ramat Gan",height:null,floors:23,status:"Proposed",lat:32.06366,lng:34.83621},
{id:295,name:"Rashi Aba Hillel",city:"Ramat Gan",height:null,floors:10,status:"Approved",lat:32.05935,lng:34.82643},
{id:296,name:"Lot 206 EB",city:"Ganei Tikva",height:null,floors:19,status:"Approved",lat:32.05634,lng:34.84855},
{id:297,name:"Hannah Szenes EB",city:"Givatayim",height:null,floors:11,status:"Proposed",lat:32.07873,lng:34.81637},
{id:298,name:"The Rothschild",city:"Petah Tikva",height:null,floors:26,status:"Proposed",lat:32.09002,lng:34.88548},
{id:299,name:"Trio 1000",city:"Rishon LeZion",height:null,floors:22,status:"Approved",lat:31.97171,lng:34.78},
{id:300,name:"Basel Baltimore",city:"Petah Tikva",height:null,floors:31,status:"Approved",lat:32.0814,lng:34.89092},
{id:301,name:"6 HaYetsira",city:"Ramat Gan",height:null,floors:50,status:"Approved",lat:32.05849,lng:34.81773},
{id:302,name:"Migdalei Rakafot (Tower 1)",city:"Rishon LeZion",height:null,floors:28,status:"Completed",lat:31.98378,lng:34.80065},
{id:789,name:"Migdalei Rakafot (Tower 2)",city:"Rishon LeZion",height:null,floors:28,status:"Completed",lat:31.98378,lng:34.80065},
{id:303,name:"Gavriel Towers (Tower 1)",city:"Rehovot",height:null,floors:21,status:"Under Construction",lat:31.90117,lng:34.80777},
{id:304,name:"Shalom Tzalah E-B",city:"Petah Tikva",height:null,floors:32,status:"Approved",lat:32.08916,lng:34.87679},
{id:305,name:"Fiori Shikmim",city:"Beer Yaakov",height:null,floors:26,status:"Under Construction",lat:31.94034,lng:34.8385},
{id:306,name:"7–9 Atzmaut Street",city:"Bat Yam",height:null,floors:11,status:"Under Construction",lat:32.01663,lng:34.74432},
{id:307,name:"DREAMS Park HaYam",city:"Bat Yam",height:null,floors:31,status:"Approved",lat:32.01232,lng:34.75954},
{id:308,name:"Hermann Fogel E–B",city:"Petah Tikva",height:null,floors:10,status:"Approved",lat:32.09691,lng:34.88766},
{id:309,name:"Frug EB",city:"Ramat Gan",height:null,floors:30,status:"Proposed",lat:32.074,lng:34.81447},
{id:310,name:"Sperber HaKomemiut EB",city:"Bat Yam",height:null,floors:29,status:"Approved",lat:32.02439,lng:34.75519},
{id:311,name:"Azrieli Petah Tikva",city:"Petah Tikva",height:null,floors:40,status:"Approved",lat:32.08398,lng:34.88331},
{id:312,name:"23-27 Moshe Sharett",city:"Holon",height:null,floors:25,status:"Proposed",lat:32.00847,lng:34.79773},
{id:313,name:"Aura Ma\'ar 3 EB",city:"Lod",height:null,floors:9,status:"Proposed",lat:31.93986,lng:34.89224},
{id:314,name:"HaPodim EB",city:"Ramat Gan",height:null,floors:12,status:"Proposed",lat:32.07745,lng:34.81556},
{id:315,name:"Khalmit Mega Project",city:"Bat Yam",height:null,floors:40,status:"Approved",lat:32.02784,lng:34.75628},
{id:316,name:"Ha\'Atzmaut Square",city:"Ramat Gan",height:null,floors:10,status:"Proposed",lat:32.06883,lng:34.821},
{id:317,name:"Ha\'Atsmaut Tower",city:"Bat Yam",height:null,floors:37,status:"Proposed",lat:32.01922,lng:34.76171},
{id:318,name:"Katzenelson EB",city:"Bat Yam",height:null,floors:46,status:"Approved",lat:32.01491,lng:34.75193},
{id:319,name:"HaMasger Complex",city:"Bat Yam",height:null,floors:38,status:"Planned",lat:32.0106,lng:34.74215},
{id:320,name:"Britania Israel on the Park",city:"Bnei Brak",height:null,floors:58,status:"Marketing",lat:32.08889,lng:34.84087},
{id:321,name:"Shbiro Towers (18fl Tower 1)",city:"Ramat Gan",height:null,floors:18,status:"Completed",lat:32.07228,lng:34.82208},
{id:322,name:"Yoseftal 111-113 (115)",city:"Bat Yam",height:null,floors:null,status:"Planned",lat:32.02267,lng:34.7378},
{id:323,name:"Sokolov Echad Ha\'Am Sprinzak EB",city:"Holon",height:null,floors:10,status:"Proposed",lat:32.01106,lng:34.79012},
{id:324,name:"BSR 1K Residential Towers (Tower 1)",city:"Rishon LeZion",height:null,floors:21,status:"Proposed",lat:31.96395,lng:34.78543},
{id:325,name:"Imber Tower",city:"Petah Tikva",height:176.0,floors:40,status:"Approved",lat:32.09864,lng:34.89635},
{id:326,name:"Tel Giborim EB",city:"Bnei Brak",height:null,floors:8,status:"Proposed",lat:32.08803,lng:34.83217},
{id:327,name:"Rothschild–Ringelblum E–B",city:"Petah Tikva",height:null,floors:27,status:"Approved",lat:32.09002,lng:34.87679},
{id:328,name:"Mika Towers (Tower 1)",city:"Holon",height:null,floors:24,status:"Proposed",lat:32.01451,lng:34.7912},
{id:329,name:"Maariv Printing House Compound",city:"Bat Yam",height:null,floors:40,status:"Planned",lat:32.0175,lng:34.74432},
{id:330,name:"Castro Towers (Tower 1)",city:"Bat Yam",height:null,floors:40,status:"Approved",lat:32.01319,lng:34.75954},
{id:331,name:"Weiss-Bulthaup Bat Yam",city:"Bat Yam",height:null,floors:30,status:"Proposed",lat:32.03388,lng:34.74976},
{id:332,name:"88-92 Katzenelson",city:"Givatayim",height:null,floors:26,status:"Proposed",lat:32.07787,lng:34.79897},
{id:333,name:"13-31 Katzenelson",city:"Givatayim",height:null,floors:20,status:"Proposed",lat:32.07356,lng:34.81419},
{id:334,name:"Soho Complex",city:"Rishon LeZion",height:null,floors:18,status:"Approved",lat:31.97084,lng:34.78761},
{id:335,name:"HaYarden Negba EB",city:"Ramat Gan",height:null,floors:9,status:"Proposed",lat:32.06193,lng:34.83513},
{id:336,name:"Bedner EB",city:"Ramat Gan",height:null,floors:22,status:"Proposed",lat:32.05762,lng:34.82534},
{id:337,name:"Odis Compound",city:"Petah Tikva",height:null,floors:31,status:"Proposed",lat:32.09691,lng:34.87896},
{id:338,name:"Haroe EB",city:"Ramat Gan",height:null,floors:31,status:"Proposed",lat:32.074,lng:34.83078},
{id:339,name:"City Square",city:"Bat Yam",height:null,floors:15,status:"Planned",lat:32.02439,lng:34.7465},
{id:340,name:"HaLochamim",city:"Holon",height:null,floors:null,status:"Proposed",lat:32.01278,lng:34.79881},
{id:341,name:"101-103 HaYarden",city:"Ramat Gan",height:null,floors:34,status:"Proposed",lat:32.06107,lng:34.82643},
{id:342,name:"4 HaMa\'avak",city:"Givatayim",height:null,floors:18,status:"Proposed",lat:32.05976,lng:34.80115},
{id:343,name:"Ben Gurion 47",city:"Bat Yam",height:null,floors:16,status:"Proposed",lat:32.03215,lng:34.75737},
{id:344,name:"eWave HaThiya",city:"Bat Yam",height:null,floors:9,status:"Planned",lat:32.02784,lng:34.74758},
{id:345,name:"Kugel Masterplan",city:"Holon",height:null,floors:40,status:"Approved",lat:32.01623,lng:34.7749},
{id:346,name:"Rashi HaHaroshet EB",city:"Ramat Gan",height:null,floors:27,status:"Proposed",lat:32.06452,lng:34.82752},
{id:347,name:"Sokolov Compound EB (Tower 1)",city:"Holon",height:null,floors:14,status:"Proposed",url:"https://www.skyscrapercity.com/threads/holon-sokolov-compound-eb-30-14-fl-prop.2395012/",lat:32.00761,lng:34.78033},
{id:953,name:"Sokolov Compound EB (Tower 2)",city:"Holon",height:null,floors:30,status:"Proposed",url:"https://www.skyscrapercity.com/threads/holon-sokolov-compound-eb-30-14-fl-prop.2395012/",lat:32.00761,lng:34.78033},
{id:348,name:"Shimon HaBursekay 4",city:"Bat Yam",height:null,floors:28,status:"Approved",lat:32.0106,lng:34.75845},
{id:349,name:"HaRav Levi",city:"Bat Yam",height:null,floors:40,status:"Approved",lat:32.03129,lng:34.74867},
{id:350,name:"UP Kinamon",city:"Bat Yam",height:null,floors:15,status:"Planned",lat:32.02698,lng:34.73889},
{id:351,name:"Hetzi Hinam Complex",city:"Rehovot",height:null,floors:24,status:"Proposed",lat:31.89427,lng:34.8132},
{id:352,name:"Gindi Givatayim Park",city:"Givatayim",height:125.0,floors:25,status:"Approved",lat:32.06666,lng:34.80332},
{id:353,name:"Green City",city:"Rosh HaAyin",height:null,floors:18,status:"Topped Out",lat:32.08655,lng:34.96704},
{id:354,name:"16-18 Shalem",city:"Ramat Gan",height:null,floors:32,status:"Approved",lat:32.08004,lng:34.82426},
{id:355,name:"Rom HaMoshava",city:"Petah Tikva",height:null,floors:40,status:"Planned",lat:32.09433,lng:34.87787},
{id:356,name:"Katzenelson EB",city:"Givatayim",height:null,floors:9,status:"Proposed",lat:32.07442,lng:34.81419},
{id:357,name:"Negba Bar Kochva",city:"Ramat Gan",height:null,floors:8,status:"Proposed",lat:32.06711,lng:34.81991},
{id:358,name:"Geffen Towers (Tower 1)",city:"Ramat Gan",height:140.0,floors:41,status:"Completed",lat:32.0628,lng:34.83513},
{id:840,name:"Geffen Towers (Tower 2)",city:"Ramat Gan",height:110.0,floors:32,status:"Completed",lat:32.0628,lng:34.83513},
{id:359,name:"ELECTRA - STAR OF THE PARK",city:"Bat Yam",height:null,floors:20,status:"Under Construction",lat:32.01319,lng:34.75084},
{id:360,name:"52-56 Negbah",city:"Ramat Gan",height:null,floors:21,status:"Proposed",lat:32.07918,lng:34.81556},
{id:361,name:"Shevet Dan E-B",city:"Petah Tikva",height:null,floors:25,status:"Approved",lat:32.09347,lng:34.89418},
{id:362,name:"Park Horowitz Tower",city:"Rehovot",height:null,floors:18,status:"Proposed",lat:31.89686,lng:34.8056},
{id:363,name:"Herzl Balfour Complex Bat Yam (Tower 1)",city:"Bat Yam",height:null,floors:35,status:"Planned",url:"https://www.skyscrapercity.com/threads/bat-yam-herzl-balfour-complex-bat-yam-3-x-35-fl-planned.2385722/",lat:32.02094,lng:34.76171},
{id:947,name:"Herzl Balfour Complex Bat Yam (Tower 2)",city:"Bat Yam",height:null,floors:35,status:"Planned",url:"https://www.skyscrapercity.com/threads/bat-yam-herzl-balfour-complex-bat-yam-3-x-35-fl-planned.2385722/",lat:32.02094,lng:34.76171},
{id:948,name:"Herzl Balfour Complex Bat Yam (Tower 3)",city:"Bat Yam",height:null,floors:35,status:"Planned",url:"https://www.skyscrapercity.com/threads/bat-yam-herzl-balfour-complex-bat-yam-3-x-35-fl-planned.2385722/",lat:32.02094,lng:34.76171},
{id:364,name:"Shenkar North",city:"Petah Tikva",height:null,floors:40,status:"Approved",lat:32.08053,lng:34.88983},
{id:365,name:"Ben Gurion Mixed Use",city:"Bat Yam",height:null,floors:25,status:"Proposed",lat:32.01232,lng:34.74215},
{id:366,name:"Naveh Tower",city:"Bat Yam",height:158.0,floors:44,status:"Completed",lat:32.03301,lng:34.75737},
{id:367,name:"Eden Tower",city:"Bat Yam",height:168.0,floors:46,status:"Topped Out",lat:32.0287,lng:34.74758},
{id:368,name:"Vision/HaSandlar Tower",city:"Bat Yam",height:135.0,floors:38,status:"Completed",lat:32.02439,lng:34.7378},
{id:369,name:"Hi Yam Tower",city:"Bat Yam",height:null,floors:33,status:"Completed",lat:32.02008,lng:34.75302},
{id:370,name:"Migdal HaYam",city:"Bat Yam",height:138.0,floors:37,status:"Completed",lat:32.01577,lng:34.74323},
{id:371,name:"Hadar Yam",city:"Bat Yam",height:135.0,floors:38,status:"Completed",lat:32.01146,lng:34.75845},
{id:372,name:"Uptown Tower (Tower 1)",city:"Bat Yam",height:162.0,floors:46,status:"Completed",lat:32.03215,lng:34.74867},
{id:793,name:"Uptown Tower (Tower 2)",city:"Bat Yam",height:131.0,floors:34,status:"Completed",lat:32.03215,lng:34.74867},
{id:373,name:"Krause Towers (Tower 1)",city:"Holon",height:null,floors:30,status:"Completed",lat:32.02054,lng:34.77599},
{id:374,name:"Hakhsharat HaYishuv Tower (ILDC 1)",city:"Bnei Brak",height:null,floors:40,status:"Completed",lat:32.08113,lng:34.8376},
{id:375,name:"Sapir Tower",city:"Ramat Gan",height:170.0,floors:43,status:"Completed",lat:32.06452,lng:34.81882},
{id:376,name:"Beit Ets HaShaked, formerly Park Tower",city:"Bnei Brak",height:null,floors:20,status:"Completed",lat:32.07251,lng:34.84304},
{id:377,name:"Amot Holon",city:"Holon",height:null,floors:23,status:"Completed",lat:32.0033,lng:34.78686},
{id:378,name:"Almog Yavne",city:"Yavne",height:null,floors:20,status:"Completed",lat:31.88649,lng:34.73137},
{id:379,name:"Market Towers",city:"Petah Tikva",height:null,floors:25,status:"Completed",lat:32.09088,lng:34.89309},
{id:380,name:"Tzameret Ein Ganim",city:"Petah Tikva",height:null,floors:24,status:"Topped Out",lat:32.08657,lng:34.88331},
{id:381,name:"Rama Tower",city:"Ramat Gan",height:100.0,floors:27,status:"Completed",lat:32.06366,lng:34.83513},
{id:382,name:"Allied Tower",city:"Bnei Brak",height:null,floors:25,status:"Completed",lat:32.07165,lng:34.83434},
{id:383,name:"V Tower",city:"Bnei Brak",height:85.0,floors:20,status:"Completed",lat:32.09234,lng:34.82456},
{id:384,name:"Menora Tower",city:"Ramat Gan",height:146.0,floors:35,status:"Completed",lat:32.07573,lng:34.83078},
{id:385,name:"Shachar Tower",city:"Givatayim",height:200.0,floors:53,status:"Completed",lat:32.07442,lng:34.8055},
{id:386,name:"Haduvdevan 8",city:"Kiryat Ono",height:null,floors:21,status:"Completed",lat:32.05401,lng:34.86701},
{id:387,name:"Harel House (Crystal House)",city:"Ramat Gan",height:112.0,floors:26,status:"Completed",lat:32.0628,lng:34.82643},
{id:388,name:"Ordea Tower",city:"Ramat Gan",height:106.0,floors:30,status:"Completed",lat:32.05849,lng:34.81665},
{id:389,name:"Pisgat Dan - Jabotinsky 105",city:"Ramat Gan",height:140.0,floors:40,status:"Completed",lat:32.07918,lng:34.83187},
{id:390,name:"BSR Tower 1",city:"Ramat Gan",height:110.0,floors:28,status:"Completed",lat:32.07487,lng:34.82208},
{id:779,name:"BSR Tower 2",city:"Bnei Brak",height:121.0,floors:27,status:"Completed",lat:32.09601,lng:34.82208},
{id:391,name:"Savyon Mofet",city:"Ramat Gan",height:120.0,floors:31,status:"Completed",lat:32.07056,lng:34.8123},
{id:392,name:"BSR Tower 4",city:"Bnei Brak",height:null,floors:40,status:"Completed",lat:32.07854,lng:34.83652},
{id:780,name:"BSR Tower 3",city:"Bnei Brak",height:133.9,floors:35,status:"Completed",lat:32.07854,lng:34.83652},
{id:393,name:"Naveh Kfar Ganim",city:"Petah Tikva",height:80.0,floors:25,status:"Completed",lat:32.08053,lng:34.88113},
{id:394,name:"Derech Hatikva 15",city:"Ganei Tikva",height:null,floors:17,status:"Topped Out",lat:32.03392,lng:34.86485},
{id:395,name:"Migdal Al HaPark Tower",city:"Ramat Gan",height:120.0,floors:34,status:"Topped Out",lat:32.07831,lng:34.82317},
{id:396,name:"Home and Sea",city:"Bat Yam",height:null,floors:26,status:"Completed",lat:32.0287,lng:34.73889},
{id:397,name:"Electra Al Hayam",city:"Bat Yam",height:null,floors:26,status:"Completed",lat:32.02439,lng:34.7541},
{id:398,name:"H Kiryat Krinizi",city:"Ramat Gan",height:null,floors:26,status:"Topped Out",lat:32.06538,lng:34.81882},
{id:399,name:"Kalanit Towers (Tower 1)",city:"Kiryat Ono",height:null,floors:18,status:"Completed",lat:32.04797,lng:34.86484},
{id:400,name:"Unik View",city:"Petah Tikva",height:null,floors:30,status:"Completed",lat:32.07536,lng:34.88766},
{id:401,name:"Migdal HaKishon",city:"Bnei Brak",height:180.0,floors:46,status:"Approved",lat:32.08975,lng:34.82347},
{id:402,name:"Metromall/Ogen Park B",city:"Rehovot",height:null,floors:21,status:"Completed",lat:31.89944,lng:34.81429},
{id:403,name:"Central Heights-Phase 2",city:"Givatayim",height:null,floors:26,status:"Completed",lat:32.07183,lng:34.80441},
{id:404,name:"Amot Atrium Tower",city:"Ramat Gan",height:153.0,floors:37,status:"Completed",lat:32.06452,lng:34.83513},
{id:405,name:"B.S.R. in Borochov",city:"Givatayim",height:66.0,floors:20,status:"Completed",lat:32.06321,lng:34.80984},
{id:406,name:"Naveh Towers (Tower 1)",city:"Holon",height:75.0,floors:23,status:"Completed",lat:32.0033,lng:34.77816},
{id:407,name:"Minrav Tower",city:"Holon",height:90.0,floors:27,status:"Completed",lat:32.02399,lng:34.79338},
{id:408,name:"Champion Tower",city:"Bnei Brak",height:160.0,floors:42,status:"Completed",lat:32.08458,lng:34.83},
{id:409,name:"City Tower",city:"Holon",height:120.0,floors:30,status:"Completed",lat:32.01537,lng:34.79881},
{id:410,name:"Centurion Tower",city:"Holon",height:85.0,floors:25,status:"Under Construction",lat:32.01106,lng:34.78903},
{id:411,name:"Migdalim BaSdera",city:"Holon",height:null,floors:25,status:"Completed",lat:32.00675,lng:34.77925},
{id:412,name:"Aura Boulevard",city:"Holon",height:null,floors:21,status:"Topped Out",lat:32.02744,lng:34.79447},
{id:413,name:"Time Tower",city:"Ramat Gan",height:135.0,floors:38,status:"Completed",lat:32.07573,lng:34.82208},
{id:414,name:"Jabotinsky Hotel",city:"Ramat Gan",height:150.0,floors:36,status:"Proposed",lat:32.07142,lng:34.8123},
{id:415,name:"Ashdar Bat Yam",city:"Bat Yam",height:147.0,floors:37,status:"Completed",lat:32.02181,lng:34.75302},
{id:416,name:"Gindi West side",city:"Rehovot",height:null,floors:23,status:"Unknown",lat:31.8891,lng:34.80233},
{id:417,name:"Shikma Al Hapark",city:"Ramat Gan",height:null,floors:17,status:"Unknown",lat:32.05849,lng:34.83295},
{id:418,name:"Song Towers (Tower 1)",city:"Givat Shmuel",height:null,floors:21,status:"Completed",lat:32.08908,lng:34.84777},
{id:419,name:"Electra Towers (Tower 1)",city:"Ramla",height:null,floors:21,status:"Under Construction",lat:31.93407,lng:34.85109},
{id:420,name:"Moshe Aviv Tower",city:"Ramat Gan",height:235.0,floors:68,status:"Completed",lat:32.07056,lng:34.8286},
{id:421,name:"Azorim Hof Bat Yam",city:"Bat Yam",height:135.0,floors:40,status:"Completed",lat:32.02094,lng:34.74432},
{id:422,name:"Electra Office Park",city:"Rishon LeZion",height:null,floors:25,status:"Planned",lat:31.96653,lng:34.80174},
{id:423,name:"Harel Tower",city:"Ramat Gan",height:null,floors:50,status:"Approved",lat:32.05762,lng:34.82426},
{id:424,name:"Prizma Tower",city:"Petah Tikva",height:null,floors:22,status:"Planned",lat:32.09691,lng:34.87787},
{id:425,name:"Tzur Barzel",city:"Bat Yam",height:null,floors:34,status:"Marketing",lat:32.0287,lng:34.75519},
{id:426,name:"Rassco Tower",city:"Givat Shmuel",height:null,floors:17,status:"Under Construction",lat:32.07959,lng:34.84451},
{id:427,name:"My Unik",city:"Ganei Tikva",height:null,floors:19,status:"Under Construction",lat:32.04168,lng:34.86703},
{id:428,name:"Gan HaPecan",city:"Rehovot",height:null,floors:18,status:"Under Construction",lat:31.88737,lng:34.80994},
{id:429,name:"YAMA Tower",city:"Bat Yam",height:null,floors:24,status:"Under Construction",lat:32.01146,lng:34.74106},
{id:430,name:"David Sadab Holon",city:"Holon",height:null,floors:19,status:"Under Construction",lat:32.02485,lng:34.79338},
{id:431,name:"Rakafot Tower",city:"Rishon LeZion",height:null,floors:30,status:"Under Construction",lat:31.97774,lng:34.7887},
{id:432,name:"Elita Towers (Tower 1)",city:"Ramat Gan",height:null,floors:58,status:"Planned",lat:32.06883,lng:34.83621},
{id:433,name:"Migdalei Bat Yam",city:"Bat Yam",height:null,floors:43,status:"Approved",lat:32.01922,lng:34.75193},
{id:434,name:"Mishkenot Nechalim",city:"Petah Tikva",height:null,floors:21,status:"Under Construction",lat:32.07881,lng:34.88005},
{id:435,name:"HaMoshavot Tower",city:"Petah Tikva",height:null,floors:17,status:"Under Construction",lat:32.0745,lng:34.89527},
{id:436,name:"Sarfati Gardens",city:"Beer Yaakov",height:null,floors:17,status:"Under Construction",lat:31.95069,lng:34.83198},
{id:437,name:"SPACE Towers (Tower 1)",city:"Petah Tikva",height:77.0,floors:22,status:"Completed",url:"https://www.skyscrapercity.com/threads/petah-tikva-space-towers-3x77-m-3x22-fl-completed.1802206/",lat:32.09088,lng:34.8757},
{id:949,name:"SPACE Towers (Tower 2)",city:"Petah Tikva",height:77.0,floors:22,status:"Completed",url:"https://www.skyscrapercity.com/threads/petah-tikva-space-towers-3x77-m-3x22-fl-completed.1802206/",lat:32.09088,lng:34.8757},
{id:950,name:"SPACE Towers (Tower 3)",city:"Petah Tikva",height:77.0,floors:22,status:"Completed",url:"https://www.skyscrapercity.com/threads/petah-tikva-space-towers-3x77-m-3x22-fl-completed.1802206/",lat:32.09088,lng:34.8757},
{id:438,name:"City Home - Herzl 197",city:"Rehovot",height:null,floors:16,status:"Topped Out",lat:31.89427,lng:34.81212},
{id:439,name:"Orion Towers",city:"Or Yehuda",height:null,floors:17,status:"Completed",lat:32.02856,lng:34.84293},
{id:440,name:"Le\'om Towers",city:"Rishon LeZion",height:null,floors:24,status:"Completed",lat:31.96395,lng:34.80065},
{id:441,name:"Aura Design Plus",city:"Holon",height:null,floors:18,status:"Topped Out",lat:32.02744,lng:34.78577},
{id:442,name:"Netanel Tower",city:"Holon",height:70.0,floors:22,status:"Topped Out",lat:32.02313,lng:34.77599},
{id:443,name:"Ahuzat Meyer Tower",city:"Bat Yam",height:68.0,floors:20,status:"Completed",lat:32.02612,lng:34.7541},
{id:444,name:"Talshir Givat Ahava",city:"Rehovot",height:null,floors:17,status:"Topped Out",lat:31.89341,lng:34.80342},
{id:445,name:"Mizrachi Perfect",city:"Holon",height:null,floors:20,status:"Completed",lat:32.0102,lng:34.79664},
{id:446,name:"Dunietz In Hashdera",city:"Holon",height:null,floors:19,status:"Completed",lat:32.00589,lng:34.78686},
{id:447,name:"Top Sport tower",city:"Holon",height:null,floors:23,status:"Completed",lat:32.02658,lng:34.77707},
{id:448,name:"Dunitz in Neve Gan",city:"Petah Tikva",height:null,floors:18,status:"Completed",lat:32.09347,lng:34.89309},
{id:449,name:"Unik Park",city:"Petah Tikva",height:null,floors:24,status:"Completed",lat:32.08916,lng:34.88331},
{id:450,name:"Shoham Prashkovsky Towers",city:"Beer Yaakov",height:null,floors:21,status:"Topped Out",lat:31.94034,lng:34.84503},
{id:451,name:"Bar Kochva Tower",city:"Bnei Brak",height:100.0,floors:25,status:"Completed",lat:32.07423,lng:34.83434},
{id:452,name:"Five Premium",city:"Petah Tikva",height:null,floors:26,status:"Topped Out",lat:32.07622,lng:34.87896},
{id:453,name:"Tzamarot Dan Towers (Tower 1)",city:"Petah Tikva",height:95.0,floors:30,status:"Completed",lat:32.09691,lng:34.89418},
{id:454,name:"Faire Tower",city:"Ramat Gan",height:110.0,floors:31,status:"Completed",lat:32.074,lng:34.821},
{id:455,name:"MAX Tower",city:"Petah Tikva",height:80.0,floors:25,status:"Topped Out",lat:32.08829,lng:34.89961},
{id:456,name:"Central Beach 2 Tower",city:"Bat Yam",height:null,floors:20,status:"Unknown",lat:32.02008,lng:34.75193},
{id:457,name:"M Tower",city:"Petah Tikva",height:70.0,floors:21,status:"Completed",lat:32.07967,lng:34.88005},
{id:458,name:"Gan HaMoshavot",city:"Petah Tikva",height:70.0,floors:22,status:"Completed",lat:32.07536,lng:34.89527},
{id:459,name:"Gindi Towers (Tower 1)",city:"Ganei Tikva",height:65.0,floors:20,status:"Completed",url:"https://www.skyscrapercity.com/threads/ganei-tikva-gindi-towers-3-x-20-fl-completed.1589983/",lat:32.05375,lng:34.85398},
{id:951,name:"Gindi Towers (Tower 2)",city:"Ganei Tikva",height:65.0,floors:20,status:"Completed",url:"https://www.skyscrapercity.com/threads/ganei-tikva-gindi-towers-3-x-20-fl-completed.1589983/",lat:32.05375,lng:34.85398},
{id:952,name:"Gindi Towers (Tower 3)",city:"Ganei Tikva",height:65.0,floors:20,status:"Completed",url:"https://www.skyscrapercity.com/threads/ganei-tikva-gindi-towers-3-x-20-fl-completed.1589983/",lat:32.05375,lng:34.85398},
{id:460,name:"Yigal Alon 161-63",city:"Tel Aviv",height:null,floors:27,status:"Approved",lat:32.09478,lng:34.7568},
{id:461,name:"Azrieli Center Spiral Tower",city:"Tel Aviv",height:336.0,floors:88,status:"Under Construction",lat:32.08616,lng:34.78723},
{id:462,name:"Ashira (Eshkol 101) (Tower 1)",city:"Tel Aviv",height:70.0,floors:15,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/tel-aviv-ashira-eshkol-101-35-16-fl-136m-70m-u-c.2393181/",lat:32.07754,lng:34.76767},
{id:959,name:"Ashira (Eshkol 101) (Tower 2)",city:"Tel Aviv",height:136.0,floors:34,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/tel-aviv-ashira-eshkol-101-35-16-fl-136m-70m-u-c.2393181/",lat:32.07754,lng:34.76767},
{id:976,name:"Ashira (Eshkol 101) (Low-rise 1)",city:"Tel Aviv",height:null,floors:7,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/tel-aviv-ashira-eshkol-101-35-16-fl-136m-70m-u-c.2393181/",lat:32.07754,lng:34.76767},
{id:977,name:"Ashira (Eshkol 101) (Low-rise 2)",city:"Tel Aviv",height:null,floors:8,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/tel-aviv-ashira-eshkol-101-35-16-fl-136m-70m-u-c.2393181/",lat:32.07754,lng:34.76767},
{id:463,name:"Levanda Tower",city:"Tel Aviv",height:null,floors:29,status:"Topped Out",lat:32.06892,lng:34.7981},
{id:464,name:"Ybox Gat Rimon Tower (Tower 1)",city:"Tel Aviv",height:null,floors:41,status:"Under Construction",lat:32.0603,lng:34.77854},
{id:465,name:"Yama TLV (DOV Tel Aviv / Eshkol 107)",city:"Tel Aviv",height:165.0,floors:16,status:"Planned",lat:32.10168,lng:34.75897},
{id:466,name:"Eshkol 109 (Tower 1)",city:"Tel Aviv",height:156.0,floors:42,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-109-42-10-fl-156m-u-c.2390686/",lat:32.09306,lng:34.78941},
{id:960,name:"Eshkol 109 (Tower 2)",city:"Tel Aviv",height:null,floors:10,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-109-42-10-fl-156m-u-c.2390686/",lat:32.09306,lng:34.78941},
{id:467,name:"BSR Sarona, formerly United Sarona",city:"Tel Aviv",height:null,floors:40,status:"Completed",lat:32.08444,lng:34.76984},
{id:468,name:"Landmark Towers (Tower A)",city:"Tel Aviv",height:162.0,floors:45,status:"Completed",url:"https://www.skyscrapercity.com/threads/tel-aviv-landmark-towers-formerly-arania-towers-sharona-lot-7-tower-2-x-162m-45fl-u-c.1850429/",lat:32.07582,lng:34.80028},
{id:815,name:"Landmark Towers (Tower B)",city:"Tel Aviv",height:162.0,floors:45,status:"Topped Out",url:"https://www.skyscrapercity.com/threads/tel-aviv-landmark-towers-formerly-arania-towers-sharona-lot-7-tower-2-x-162m-45fl-u-c.1850429/",lat:32.07582,lng:34.80028},
{id:469,name:"Vitania Towers (Tower 1)",city:"Tel Aviv",height:146.0,floors:36,status:"Completed",url:"https://www.skyscrapercity.com/threads/tel-aviv-vitania-towers-2-x-42-fl-1-x-36-fl-1-completed-1-t-o-1-u-c.1592984/",lat:32.0672,lng:34.78071},
{id:956,name:"Vitania Towers (Tower 2)",city:"Tel Aviv",height:161.5,floors:42,status:"Topped Out",url:"https://www.skyscrapercity.com/threads/tel-aviv-vitania-towers-2-x-42-fl-1-x-36-fl-1-completed-1-t-o-1-u-c.1592984/",lat:32.0672,lng:34.78071},
{id:957,name:"Vitania Towers (Tower 3)",city:"Tel Aviv",height:161.5,floors:42,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/tel-aviv-vitania-towers-2-x-42-fl-1-x-36-fl-1-completed-1-t-o-1-u-c.1592984/",lat:32.0672,lng:34.78071},
{id:826,name:"Delek Motors Tower",city:"Tel Aviv",height:146.0,floors:36,status:"Completed",lat:32.0555,lng:34.7838},
{id:470,name:"Mandarin Oriental Hotel & Residences",city:"Tel Aviv",height:97.0,floors:25,status:"Topped Out",lat:32.10858,lng:34.76115},
{id:471,name:"East& / Fmr Migdaley HaYetzira (South Tower)",city:"Tel Aviv",height:144.55,floors:35,status:"Completed",lat:32.09996,lng:34.79158},
{id:784,name:"East& / Fmr Migdaley HaYetzira (North Tower)",city:"Tel Aviv",height:152.5,floors:41,status:"Completed",lat:32.09996,lng:34.79158},
{id:472,name:"Sitonai Market Towers (Tower 1)",city:"Tel Aviv",height:160.0,floors:48,status:"Completed",lat:32.09133,lng:34.77202},
{id:797,name:"Sitonai Market Towers (Tower 2)",city:"Tel Aviv",height:160.0,floors:48,status:"Completed",lat:32.09133,lng:34.77202},
{id:798,name:"Sitonai Market Towers (Tower 3)",city:"Tel Aviv",height:160.0,floors:48,status:"Completed",lat:32.09133,lng:34.77202},
{id:799,name:"Sitonai Market Towers (Tower 4)",city:"Tel Aviv",height:160.0,floors:48,status:"Completed",lat:32.09133,lng:34.77202},
{id:473,name:"Toha by Ron Arad (Tower 2)",city:"Tel Aviv",height:302.0,floors:79,status:"Topped Out",lat:32.08271,lng:34.80245},
{id:778,name:"Toha by Ron Arad (Tower 1)",city:"Tel Aviv",height:110.0,floors:27,status:"Completed",lat:32.08271,lng:34.80245},
{id:474,name:"Daniel Tower TLV",city:"Tel Aviv",height:null,floors:25,status:"Planned",lat:32.07409,lng:34.78289},
{id:475,name:"Tara Towers (Tower 1)",city:"Tel Aviv",height:240.0,floors:55,status:"Approved",lat:32.06547,lng:34.76332},
{id:841,name:"Tara Towers (Tower 2)",city:"Tel Aviv",height:240.0,floors:55,status:"Approved",lat:32.06547,lng:34.76332},
{id:842,name:"Tara Towers (Tower 3)",city:"Tel Aviv",height:240.0,floors:55,status:"Approved",lat:32.06547,lng:34.76332},
{id:843,name:"Tara Towers (Tower 4)",city:"Tel Aviv",height:null,floors:40,status:"Approved",lat:32.06547,lng:34.76332},
{id:476,name:"Lexus Tower",city:"Tel Aviv",height:170.0,floors:48,status:"Under Construction",lat:32.10685,lng:34.79376},
{id:477,name:"Sarona Hotel",city:"Tel Aviv",height:163.0,floors:46,status:"Topped Out",lat:32.09823,lng:34.77419},
{id:478,name:"Atidim Office Park Tower – Building 9",city:"Tel Aviv",height:null,floors:30,status:"Under Construction",lat:32.08961,lng:34.80463},
{id:479,name:"Kikar HaMedina Towers (Tower 1)",city:"Tel Aviv",height:155.0,floors:42,status:"Topped Out",lat:32.08099,lng:34.78506},
{id:836,name:"Kikar HaMedina Towers (Tower 2)",city:"Tel Aviv",height:155.0,floors:42,status:"Topped Out",lat:32.08099,lng:34.78506},
{id:837,name:"Kikar HaMedina Towers (Tower 3)",city:"Tel Aviv",height:155.0,floors:41,status:"Topped Out",lat:32.08099,lng:34.78506},
{id:480,name:"Rothschild 10 (Six Senses Tel Aviv)",city:"Tel Aviv",height:161.4,floors:42,status:"Topped Out",lat:32.07237,lng:34.7655},
{id:481,name:"Seminar HaKibbutzim Towers (Tower 1)",city:"Tel Aviv",height:130.0,floors:35,status:"Proposed",lat:32.06375,lng:34.79593},
{id:482,name:"100 Hashmonaim",city:"Tel Aviv",height:null,floors:40,status:"Proposed",lat:32.10513,lng:34.77637},
{id:483,name:"Da Vinci Towers (North Tower)",city:"Tel Aviv",height:155.2,floors:42,status:"Completed",lat:32.09651,lng:34.7568},
{id:795,name:"Da Vinci Towers (South Tower)",city:"Tel Aviv",height:155.2,floors:42,status:"Completed",lat:32.09651,lng:34.7568},
{id:484,name:"She",city:"Tel Aviv",height:164.0,floors:40,status:"Under Construction",url:"https://www.skyscrapercity.com/threads/tel-aviv-she-164-m-40-fl-prep.2151572/",lat:32.08789,lng:34.78723},
{id:485,name:"Florentin Tower",city:"Tel Aviv",height:null,floors:8,status:"Under Construction",lat:32.07927,lng:34.76767},
{id:486,name:"Eshkol 105",city:"Tel Aviv",height:63.0,floors:16,status:"Proposed",lat:32.07064,lng:34.7981},
{id:487,name:"Hagag First",city:"Tel Aviv",height:175.0,floors:45,status:"Marketing",lat:32.06202,lng:34.77854},
{id:488,name:"Duo TLV Towers (Tower 1)",city:"Tel Aviv",height:200.0,floors:54,status:"Topped Out",lat:32.1034,lng:34.75897},
{id:844,name:"Duo TLV Towers (Tower 2)",city:"Tel Aviv",height:200.0,floors:54,status:"Topped Out",lat:32.1034,lng:34.75897},
{id:489,name:"18–24 Herbert Samuel (Leon tower)",city:"Tel Aviv",height:85.0,floors:25,status:"On Hold",lat:32.09478,lng:34.78941},
{id:490,name:"Six-8",city:"Tel Aviv",height:null,floors:18,status:"Under Construction",lat:32.08616,lng:34.76984},
{id:491,name:"True TLV (fmr. Arto - Dafna 505)",city:"Tel Aviv",height:null,floors:25,status:"Under Construction",lat:32.07754,lng:34.80028},
{id:492,name:"Insurance companies towers (Tower A)",city:"Tel Aviv",height:155.5,floors:40,status:"Planned",lat:32.06892,lng:34.78071},
{id:493,name:"2-8 Einstein",city:"Tel Aviv",height:null,floors:14,status:"Under Construction",lat:32.0603,lng:34.76115},
{id:494,name:"15 Einstein",city:"Tel Aviv",height:null,floors:14,status:"Under Construction",lat:32.10168,lng:34.79158},
{id:495,name:"Cosmopolitan 1 (HaMasger)",city:"Tel Aviv",height:null,floors:47,status:"Planned",lat:32.09306,lng:34.77202},
{id:496,name:"Intro Tel Aviv",city:"Tel Aviv",height:126.0,floors:26,status:"Under Construction",lat:32.08444,lng:34.80245},
{id:497,name:"Mazeh Tower",city:"Tel Aviv",height:null,floors:41,status:"Under Construction",lat:32.07582,lng:34.78289},
{id:498,name:"Cinerama Towers (Tower 1)",city:"Tel Aviv",height:null,floors:46,status:"Approved",lat:32.0672,lng:34.76332},
{id:499,name:"Masterpiece Bavli (Tower 1)",city:"Tel Aviv",height:174.8,floors:48,status:"Under Construction",lat:32.10858,lng:34.79376},
{id:930,name:"Masterpiece Bavli (Tower 2)",city:"Tel Aviv",height:174.8,floors:48,status:"Under Construction",lat:32.10858,lng:34.79376},
{id:500,name:"Yard",city:"Tel Aviv",height:null,floors:8,status:"Completed",lat:32.09996,lng:34.77419},
{id:501,name:"H Infinity",city:"Tel Aviv",height:197.0,floors:52,status:"Topped Out",lat:32.09133,lng:34.80463},
{id:502,name:"Sarona Azrieli Tower",city:"Tel Aviv",height:238.5,floors:57,status:"Completed",lat:32.08271,lng:34.78506},
{id:503,name:"Solelim Towers (40fl Tower)",city:"Tel Aviv",height:null,floors:40,status:"Completed",lat:32.07409,lng:34.7655},
{id:504,name:"Pri Megadim",city:"Tel Aviv",height:null,floors:26,status:"Topped Out",lat:32.06547,lng:34.79593},
{id:505,name:"LXR Hotels & Resorts & Curio Collection By Hilton",city:"Tel Aviv",height:92.0,floors:22,status:"Under Construction",lat:32.10685,lng:34.77637},
{id:506,name:"Temech 1 Hakirya Tower",city:"Tel Aviv",height:null,floors:35,status:"Topped Out",lat:32.09823,lng:34.7568},
{id:809,name:"HaYovel Tower (Kirya Tower)",city:"Tel Aviv",height:158.0,floors:42,status:"Completed",lat:32.09221,lng:34.79269},
{id:507,name:"Sde Dov 3209",city:"Tel Aviv",height:138.8,floors:6,status:"Approved",lat:32.08961,lng:34.78723},
{id:508,name:"Beit Amot Mishpat",city:"Tel Aviv",height:165.0,floors:45,status:"Approved",lat:32.08099,lng:34.76767},
{id:509,name:"Gindi Vogue",city:"Tel Aviv",height:43.0,floors:20,status:"Approved",lat:32.07237,lng:34.7981},
{id:510,name:"Nimrodi Ma\'ariv Tower",city:"Tel Aviv",height:220.0,floors:52,status:"Planned",lat:32.06375,lng:34.77854},
{id:511,name:"Beit HaItona\'im (Journalists\' House)",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.10513,lng:34.75897},
{id:512,name:"Semel North",city:"Tel Aviv",height:29.0,floors:8,status:"Under Construction",lat:32.09651,lng:34.78941},
{id:513,name:"Acro on the Boulevard (Kehilat Canada North)",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.08789,lng:34.76984},
{id:514,name:"Kehilat Canada South EB",city:"Tel Aviv",height:null,floors:29,status:"Approved",lat:32.07927,lng:34.80028},
{id:515,name:"NOHA (17 HaShalom)",city:"Tel Aviv",height:95.0,floors:23,status:"Under Construction",lat:32.07064,lng:34.78071},
{id:516,name:"YBox Begin",city:"Tel Aviv",height:180.0,floors:40,status:"Planned",lat:32.06202,lng:34.76115},
{id:517,name:"Assembly Tel Aviv (HaYarkon 33–37)",city:"Tel Aviv",height:null,floors:23,status:"Planned",lat:32.1034,lng:34.79158},
{id:518,name:"Emek Brakha Tower",city:"Tel Aviv",height:175.0,floors:45,status:"Planned",lat:32.09478,lng:34.77202},
{id:519,name:"GO Yafo Tel-Aviv",city:"Tel Aviv",height:null,floors:15,status:"Under Construction",lat:32.08616,lng:34.80245},
{id:520,name:"Ahimeir 5-7-9",city:"Tel Aviv",height:null,floors:20,status:"Under Construction",lat:32.07754,lng:34.78289},
{id:521,name:"Rainbow by Israel–Canada",city:"Tel Aviv",height:44.0,floors:8,status:"Under Construction",lat:32.06892,lng:34.76332},
{id:522,name:"Soho Tel Aviv Tower",city:"Tel Aviv",height:95.0,floors:23,status:"Under Construction",lat:32.0603,lng:34.79376},
{id:523,name:"TOU Towers (Tower 1)",city:"Tel Aviv",height:null,floors:33,status:"Completed",lat:32.10168,lng:34.77419},
{id:825,name:"TOU Towers (Tower 2)",city:"Tel Aviv",height:null,floors:33,status:"Completed",lat:32.10168,lng:34.77419},
{id:524,name:"Ribal Carasso Towers (Tower 1)",city:"Tel Aviv",height:156.0,floors:48,status:"Approved",lat:32.09306,lng:34.80463},
{id:845,name:"Ribal Carasso Towers (Tower 2)",city:"Tel Aviv",height:null,floors:45,status:"Approved",lat:32.09306,lng:34.80463},
{id:846,name:"Ribal Carasso Towers (Tower 3)",city:"Tel Aviv",height:null,floors:41,status:"Approved",lat:32.09306,lng:34.80463},
{id:525,name:"2 HaMasger",city:"Tel Aviv",height:135.5,floors:30,status:"Planned",lat:32.08444,lng:34.78506},
{id:526,name:"Frankly (44 Salame)",city:"Tel Aviv",height:null,floors:8,status:"Planned",lat:32.07582,lng:34.7655},
{id:527,name:"Downtown (36-42 HaRakevet)",city:"Tel Aviv",height:143.0,floors:35,status:"Planned",lat:32.0672,lng:34.79593},
{id:528,name:"Sde Dov 2227",city:"Tel Aviv",height:null,floors:2,status:"Approved",lat:32.10858,lng:34.77637},
{id:529,name:"Jomo Carasso",city:"Tel Aviv",height:121.0,floors:10,status:"Planned",lat:32.09996,lng:34.7568},
{id:530,name:"Benchmark Tower",city:"Tel Aviv",height:164.5,floors:42,status:"Approved",lat:32.09133,lng:34.78723},
{id:531,name:"Blue Horizon Sde Dov (Lot 2226)",city:"Tel Aviv",height:null,floors:45,status:"Approved",lat:32.08271,lng:34.76767},
{id:532,name:"Dafna 501 (Naveh Gad+Tidhar)",city:"Tel Aviv",height:null,floors:9,status:"Approved",lat:32.07409,lng:34.7981},
{id:533,name:"Elifelet Franzos EB",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.06547,lng:34.77854},
{id:534,name:"Israel Brothers Sde Dov (2103)",city:"Tel Aviv",height:null,floors:25,status:"Approved",lat:32.10685,lng:34.75897},
{id:535,name:"Seven Seas Sde Dov",city:"Tel Aviv",height:null,floors:51,status:"Proposed",lat:32.09823,lng:34.78941},
{id:536,name:"Ta\'as Compound - Tower #3",city:"Tel Aviv",height:198.0,floors:52,status:"Approved",lat:32.08961,lng:34.76984},
{id:537,name:"Bavli Beresheet Tower",city:"Tel Aviv",height:168.0,floors:45,status:"Topped Out",lat:32.08099,lng:34.80028},
{id:538,name:"Sifolux Tower",city:"Tel Aviv",height:182.5,floors:45,status:"Approved",lat:32.07237,lng:34.78071},
{id:539,name:"Azouri Eco Tower",city:"Tel Aviv",height:null,floors:21,status:"Completed",lat:32.06375,lng:34.76115},
{id:540,name:"Beit Mars",city:"Tel Aviv",height:110.0,floors:30,status:"Proposed",lat:32.10513,lng:34.79158},
{id:541,name:"Gymnasia Tower",city:"Tel Aviv",height:100.0,floors:30,status:"Completed",lat:32.09651,lng:34.77202},
{id:542,name:"HaTashbetz (HaTehiya)",city:"Tel Aviv",height:null,floors:27,status:"Approved",lat:32.08789,lng:34.80245},
{id:543,name:"America House",city:"Tel Aviv",height:null,floors:30,status:"Approved",lat:32.07927,lng:34.78289},
{id:544,name:"Meier on Rothschild Tower",city:"Tel Aviv",height:158.0,floors:38,status:"Completed",lat:32.07064,lng:34.76332},
{id:545,name:"4 Florentines",city:"Tel Aviv",height:36.0,floors:10,status:"Completed",lat:32.06202,lng:34.79376},
{id:546,name:"Shidrat Country Glilot",city:"Tel Aviv",height:null,floors:20,status:"Approved",lat:32.1034,lng:34.77419},
{id:547,name:"Bat Sheva Tower",city:"Tel Aviv",height:null,floors:36,status:"Planned",lat:32.09478,lng:34.80463},
{id:548,name:"Begin HaHashmal",city:"Tel Aviv",height:null,floors:8,status:"Approved",lat:32.08616,lng:34.78506},
{id:549,name:"YBox-Tidhar RH",city:"Tel Aviv",height:null,floors:18,status:"Topped Out",lat:32.07754,lng:34.7655},
{id:550,name:"Eshkol 106",city:"Tel Aviv",height:65.0,floors:16,status:"Approved",lat:32.06892,lng:34.79593},
{id:551,name:"Park Bavli (Tower 1)",city:"Tel Aviv",height:150.0,floors:44,status:"Completed",lat:32.0603,lng:34.77637},
{id:796,name:"Park Bavli (Tower 2)",city:"Tel Aviv",height:150.0,floors:44,status:"Completed",lat:32.0603,lng:34.77637},
{id:552,name:"HaMechoga EB",city:"Tel Aviv",height:null,floors:null,status:"Approved",lat:32.10168,lng:34.7568},
{id:553,name:"People Tel Aviv (New CheckPoint HQ-Kremenetski)",city:"Tel Aviv",height:null,floors:40,status:"Unknown",lat:32.09306,lng:34.78723},
{id:554,name:"Eshkol 302",city:"Tel Aviv",height:29.0,floors:6,status:"Approved",lat:32.08444,lng:34.76767},
{id:555,name:"Sde Dov 3208 (Low-rise 1)",city:"Tel Aviv",height:null,floors:7,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-3208-39-4x7-fl-prop.2448844/",lat:32.07582,lng:34.7981},
{id:961,name:"Sde Dov 3208 (Tower 1)",city:"Tel Aviv",height:null,floors:39,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-3208-39-4x7-fl-prop.2448844/",lat:32.07582,lng:34.7981},
{id:962,name:"Sde Dov 3208 (Low-rise 2)",city:"Tel Aviv",height:null,floors:7,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-3208-39-4x7-fl-prop.2448844/",lat:32.07582,lng:34.7981},
{id:963,name:"Sde Dov 3208 (Low-rise 3)",city:"Tel Aviv",height:null,floors:7,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-3208-39-4x7-fl-prop.2448844/",lat:32.07582,lng:34.7981},
{id:964,name:"Sde Dov 3208 (Low-rise 4)",city:"Tel Aviv",height:null,floors:7,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-3208-39-4x7-fl-prop.2448844/",lat:32.07582,lng:34.7981},
{id:556,name:"Sde Dov 3202",city:"Tel Aviv",height:null,floors:5,status:"Approved",lat:32.0672,lng:34.77854},
{id:557,name:"Pninat Ayalon",city:"Tel Aviv",height:310.0,floors:81,status:"Proposed",lat:32.10858,lng:34.75897},
{id:558,name:"Europe House",city:"Tel Aviv",height:null,floors:32,status:"Planned",lat:32.09996,lng:34.78941},
{id:559,name:"Agish Reved & New Kiriyah towers (New Kiriyah)",city:"Tel Aviv",height:280.0,floors:65,status:"Proposed",lat:32.09133,lng:34.76984},
{id:560,name:"Bein Arim",city:"Tel Aviv",height:400.0,floors:100,status:"Approved",lat:32.08271,lng:34.80028},
{id:561,name:"Asia House Renovation",city:"Tel Aviv",height:125.0,floors:30,status:"Approved",lat:32.07409,lng:34.78071},
{id:562,name:"Leonardo Complex",city:"Tel Aviv",height:null,floors:45,status:"Approved",lat:32.06547,lng:34.76115},
{id:563,name:"Shomron Lot 100",city:"Tel Aviv",height:null,floors:10,status:"Approved",lat:32.10685,lng:34.79158},
{id:564,name:"18 Raoul Wallenberg (North Market)",city:"Tel Aviv",height:null,floors:20,status:"Approved",lat:32.09823,lng:34.77202},
{id:565,name:"77-85 HaShalom",city:"Tel Aviv",height:null,floors:9,status:"Approved",lat:32.08961,lng:34.80245},
{id:566,name:"Montefiore Tower (Yitshak Sadeh)",city:"Tel Aviv",height:null,floors:30,status:"Proposed",lat:32.08099,lng:34.78289},
{id:567,name:"Medical tower for general and brain rehabilitation (Sourasky north tower)",city:"Tel Aviv",height:null,floors:25,status:"Under Construction",lat:32.07237,lng:34.76332},
{id:568,name:"MOMA Tel Aviv",city:"Tel Aviv",height:null,floors:18,status:"Completed",lat:32.06375,lng:34.79376},
{id:569,name:"Dubnov 4–6",city:"Tel Aviv",height:165.0,floors:45,status:"Approved",lat:32.10513,lng:34.77419},
{id:570,name:"Bezeq Tower",city:"Tel Aviv",height:null,floors:16,status:"Approved",lat:32.09651,lng:34.80463},
{id:571,name:"Ichilov Hospital Adelson Tower",city:"Tel Aviv",height:null,floors:20,status:"Planned",lat:32.08789,lng:34.78506},
{id:572,name:"Ha-Umanim Towers",city:"Tel Aviv",height:null,floors:120,status:"Proposed",lat:32.07927,lng:34.7655},
{id:573,name:"Toha Residential (15 HaShalom)",city:"Tel Aviv",height:null,floors:27,status:"Proposed",lat:32.07064,lng:34.79593},
{id:574,name:"Zohi Tel Aviv (Eshkol 110) (Tower 1)",city:"Tel Aviv",height:null,floors:9,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-zohi-tel-aviv-eshkol-110-2x16-2x9-fl-approved.2428198/",lat:32.06202,lng:34.77637},
{id:936,name:"Zohi Tel Aviv (Eshkol 110) (Tower 2)",city:"Tel Aviv",height:null,floors:9,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-zohi-tel-aviv-eshkol-110-2x16-2x9-fl-approved.2428198/",lat:32.06202,lng:34.77637},
{id:937,name:"Zohi Tel Aviv (Eshkol 110) (Tower 3)",city:"Tel Aviv",height:null,floors:16,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-zohi-tel-aviv-eshkol-110-2x16-2x9-fl-approved.2428198/",lat:32.06202,lng:34.77637},
{id:938,name:"Zohi Tel Aviv (Eshkol 110) (Tower 4)",city:"Tel Aviv",height:null,floors:16,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-zohi-tel-aviv-eshkol-110-2x16-2x9-fl-approved.2428198/",lat:32.06202,lng:34.77637},
{id:575,name:"Eshkol 102 (Tower 1)",city:"Tel Aviv",height:130.0,floors:36,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-102-36-3x9-fl-130m-prop.2431580/",lat:32.1034,lng:34.7568},
{id:965,name:"Eshkol 102 (Low-rise 1)",city:"Tel Aviv",height:null,floors:9,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-102-36-3x9-fl-130m-prop.2431580/",lat:32.1034,lng:34.7568},
{id:966,name:"Eshkol 102 (Low-rise 2)",city:"Tel Aviv",height:null,floors:9,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-102-36-3x9-fl-130m-prop.2431580/",lat:32.1034,lng:34.7568},
{id:967,name:"Eshkol 102 (Low-rise 3)",city:"Tel Aviv",height:null,floors:9,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-102-36-3x9-fl-130m-prop.2431580/",lat:32.1034,lng:34.7568},
{id:576,name:"Sde Dov 2203",city:"Tel Aviv",height:null,floors:20,status:"Approved",lat:32.09478,lng:34.78723},
{id:577,name:"WIX Campus + Blue Tower",city:"Tel Aviv",height:null,floors:60,status:"Topped Out",lat:32.08616,lng:34.76767},
{id:578,name:"Sde Dov 2102 (BLK-Prashkovsky)",city:"Tel Aviv",height:84.0,floors:20,status:"Approved",lat:32.07754,lng:34.7981},
{id:579,name:"Schnitzler Complex",city:"Tel Aviv",height:107.0,floors:27,status:"Planned",lat:32.06892,lng:34.77854},
{id:580,name:"6 Wissotzky",city:"Tel Aviv",height:null,floors:18,status:"Completed",lat:32.0603,lng:34.75897},
{id:581,name:"Magor House (Dan Neot Afeka)",city:"Tel Aviv",height:null,floors:18,status:"Approved",lat:32.10168,lng:34.78941},
{id:582,name:"HaTayasim HaHagana EB",city:"Tel Aviv",height:null,floors:9,status:"Proposed",lat:32.09306,lng:34.76984},
{id:583,name:"Arlozorov Young Towers (Tower 2)",city:"Tel Aviv",height:150.0,floors:41,status:"Completed",lat:32.08444,lng:34.80028},
{id:800,name:"Arlozorov Young Towers (Tower 1)",city:"Tel Aviv",height:170.0,floors:47,status:"Completed",lat:32.08444,lng:34.80028},
{id:584,name:"6 Sha\'ul HaMelekh",city:"Tel Aviv",height:null,floors:40,status:"Proposed",lat:32.07582,lng:34.78071},
{id:585,name:"H Shadal Tower",city:"Tel Aviv",height:null,floors:40,status:"On Hold",lat:32.0672,lng:34.76115},
{id:586,name:"Tel-Aviv",city:"Tel Aviv",height:183.0,floors:50,status:"Completed",lat:32.10858,lng:34.79158},
{id:587,name:"Alpha Tower",city:"Tel Aviv",height:null,floors:32,status:"Completed",lat:32.09996,lng:34.77202},
{id:588,name:"Cosmopolitan 2 (Begin)",city:"Tel Aviv",height:180.0,floors:45,status:"Planned",lat:32.09133,lng:34.80245},
{id:589,name:"Lincoln Mekorot",city:"Tel Aviv",height:null,floors:30,status:"Approved",lat:32.08271,lng:34.78289},
{id:590,name:"Sde Dov North (Kika Braz) (Tower 1)",city:"Tel Aviv",height:null,floors:20,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-north-kika-braz-40-20-fl-prop.2445083/",lat:32.07409,lng:34.76332},
{id:968,name:"Sde Dov North (Kika Braz) (Tower 2)",city:"Tel Aviv",height:null,floors:40,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-north-kika-braz-40-20-fl-prop.2445083/",lat:32.07409,lng:34.76332},
{id:939,name:"Seven Seas Sde Dov (Tower 1)",city:"Tel Aviv",height:null,floors:51,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-seven-seas-sde-dov-51-fl-21-fl-9-fl-m-prop.2452241/",lat:32.0834,lng:34.78072},
{id:940,name:"Seven Seas Sde Dov (Tower 2)",city:"Tel Aviv",height:null,floors:21,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-seven-seas-sde-dov-51-fl-21-fl-9-fl-m-prop.2452241/",lat:32.0834,lng:34.78072},
{id:941,name:"Seven Seas Sde Dov (Tower 3)",city:"Tel Aviv",height:null,floors:9,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-seven-seas-sde-dov-51-fl-21-fl-9-fl-m-prop.2452241/",lat:32.0834,lng:34.78072},
{id:942,name:"Sde Dov 3106",city:"Tel Aviv",height:null,floors:9,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-3106-9-fl-prop.2446907/",lat:32.0834,lng:34.78072},
{id:974,name:"Sde Dov 306 (Tower 1)",city:"Tel Aviv",height:null,floors:13,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-306-13-7-fl-prop.2433641/",lat:32.0834,lng:34.78072},
{id:975,name:"Sde Dov 306 (Tower 2)",city:"Tel Aviv",height:null,floors:7,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-sde-dov-306-13-7-fl-prop.2433641/",lat:32.0834,lng:34.78072},
{id:591,name:"Keren HaKirya Towers (Tower 1)",city:"Tel Aviv",height:340.0,floors:80,status:"Approved",lat:32.06547,lng:34.79376},
{id:847,name:"Keren HaKirya Towers (Tower 2)",city:"Tel Aviv",height:null,floors:50,status:"Approved",lat:32.06547,lng:34.79376},
{id:848,name:"Keren HaKirya Towers (Tower 3)",city:"Tel Aviv",height:null,floors:45,status:"Approved",lat:32.06547,lng:34.79376},
{id:849,name:"Keren HaKirya Towers (Tower 4)",city:"Tel Aviv",height:null,floors:45,status:"Approved",lat:32.06547,lng:34.79376},
{id:592,name:"Municipal Tower",city:"Tel Aviv",height:102.0,floors:25,status:"Completed",lat:32.10685,lng:34.77419},
{id:593,name:"Eshkol 108 (Tower 1)",city:"Tel Aviv",height:141.0,floors:37,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-108-37-16-4x9-fl-141m-approved.2431581/",lat:32.09823,lng:34.80463},
{id:969,name:"Eshkol 108 (Tower 2)",city:"Tel Aviv",height:null,floors:16,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-108-37-16-4x9-fl-141m-approved.2431581/",lat:32.09823,lng:34.80463},
{id:970,name:"Eshkol 108 (Low-rise 1)",city:"Tel Aviv",height:null,floors:9,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-108-37-16-4x9-fl-141m-approved.2431581/",lat:32.09823,lng:34.80463},
{id:971,name:"Eshkol 108 (Low-rise 2)",city:"Tel Aviv",height:null,floors:9,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-108-37-16-4x9-fl-141m-approved.2431581/",lat:32.09823,lng:34.80463},
{id:972,name:"Eshkol 108 (Low-rise 3)",city:"Tel Aviv",height:null,floors:9,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-108-37-16-4x9-fl-141m-approved.2431581/",lat:32.09823,lng:34.80463},
{id:973,name:"Eshkol 108 (Low-rise 4)",city:"Tel Aviv",height:null,floors:9,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-eshkol-108-37-16-4x9-fl-141m-approved.2431581/",lat:32.09823,lng:34.80463},
{id:594,name:"HaAtad Tower",city:"Tel Aviv",height:161.0,floors:40,status:"Approved",lat:32.08961,lng:34.78506},
{id:595,name:"Century Tower",city:"Tel Aviv",height:209.5,floors:53,status:"Approved",lat:32.08099,lng:34.7655},
{id:596,name:"Menorah Allenby Tower",city:"Tel Aviv",height:157.5,floors:45,status:"Approved",lat:32.07237,lng:34.79593},
{id:597,name:"Hagag Einstein 33-35, 36",city:"Tel Aviv",height:null,floors:30,status:"Approved",lat:32.06375,lng:34.77637},
{id:598,name:"Even Gvirol 192",city:"Tel Aviv",height:null,floors:30,status:"Approved",lat:32.10513,lng:34.7568},
{id:599,name:"Ramat Aviv Mall Expansion",city:"Tel Aviv",height:null,floors:25,status:"Approved",lat:32.09651,lng:34.78723},
{id:600,name:"Dofen HaKirya",city:"Tel Aviv",height:null,floors:60,status:"Proposed",lat:32.08789,lng:34.76767},
{id:601,name:"Kalka Nimrodi Tower",city:"Tel Aviv",height:56.0,floors:15,status:"Approved",lat:32.07927,lng:34.7981},
{id:602,name:"Tomorrow (Tkoa E–B)",city:"Tel Aviv",height:null,floors:9,status:"Approved",lat:32.07064,lng:34.77854},
{id:603,name:"14-18 Einstein",city:"Tel Aviv",height:null,floors:null,status:"Planned",lat:32.06202,lng:34.75897},
{id:604,name:"The Upper House",city:"Tel Aviv",height:123.0,floors:33,status:"Completed",lat:32.1034,lng:34.78941},
{id:605,name:"HaPelekh EB",city:"Tel Aviv",height:null,floors:10,status:"Approved",lat:32.09478,lng:34.76984},
{id:606,name:"Simcha Holtsberg EB (Jaffa)",city:"Tel Aviv",height:null,floors:25,status:"Approved",lat:32.08616,lng:34.80028},
{id:607,name:"Almagor EB",city:"Tel Aviv",height:null,floors:30,status:"Approved",lat:32.07754,lng:34.78071},
{id:608,name:"TELA",city:"Tel Aviv",height:null,floors:19,status:"Proposed",lat:32.06892,lng:34.76115},
{id:609,name:"Kehilat Cleveland EB",city:"Tel Aviv",height:null,floors:7,status:"Approved",lat:32.0603,lng:34.79158},
{id:610,name:"2-8 Aminadav",city:"Tel Aviv",height:null,floors:35,status:"Proposed",lat:32.10168,lng:34.77202},
{id:611,name:"Rama Adirim EB",city:"Tel Aviv",height:null,floors:10,status:"Approved",lat:32.09306,lng:34.80245},
{id:612,name:"Brazil EB",city:"Tel Aviv",height:null,floors:8,status:"Approved",lat:32.08444,lng:34.78289},
{id:613,name:"93-101 HaShalom",city:"Tel Aviv",height:null,floors:8,status:"Approved",lat:32.07582,lng:34.76332},
{id:614,name:"Aplaton-Harif EB",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.0672,lng:34.79376},
{id:615,name:"ROM Tel Aviv",city:"Tel Aviv",height:173.1,floors:50,status:"Completed",lat:32.10858,lng:34.77419},
{id:616,name:"Hagag Ludwipol",city:"Tel Aviv",height:null,floors:24,status:"Planned",lat:32.09996,lng:34.80463},
{id:617,name:"Milman House",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.09133,lng:34.78506},
{id:618,name:"Carlton Hotel",city:"Tel Aviv",height:null,floors:28,status:"Proposed",lat:32.08271,lng:34.7655},
{id:619,name:"Pardes Abu Sayyaf",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.07409,lng:34.79593},
{id:620,name:"Rubinstein HaMakhrozet",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.06547,lng:34.77637},
{id:621,name:"Nahal HaBesor EB",city:"Tel Aviv",height:null,floors:6,status:"Approved",lat:32.10685,lng:34.7568},
{id:622,name:"Kernei-Shimoni EB",city:"Tel Aviv",height:null,floors:8,status:"Approved",lat:32.09823,lng:34.78723},
{id:623,name:"Azrieli Center (Round Tower)",city:"Tel Aviv",height:187.0,floors:50,status:"Completed",lat:32.08961,lng:34.76767},
{id:786,name:"Azrieli Center (Triangle Tower)",city:"Tel Aviv",height:169.0,floors:46,status:"Completed",lat:32.08961,lng:34.76767},
{id:828,name:"Levinstein Tower",city:"Tel Aviv",height:145.0,floors:34,status:"Completed",lat:32.0745,lng:34.7911},
{id:787,name:"Azrieli Center (Square Tower)",city:"Tel Aviv",height:154.0,floors:42,status:"Completed",lat:32.08961,lng:34.76767},
{id:624,name:"HaIrus EB",city:"Tel Aviv",height:null,floors:30,status:"Proposed",lat:32.08099,lng:34.7981},
{id:625,name:"16 HeHarash",city:"Tel Aviv",height:null,floors:24,status:"Proposed",lat:32.07237,lng:34.77854},
{id:626,name:"Aminadav Towers (Stage 2) (Tower 1)",city:"Tel Aviv",height:null,floors:47,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-aminadav-towers-stage-2-3-x-47-fl-approved-lpc.2328405/",lat:32.06375,lng:34.75897},
{id:954,name:"Aminadav Towers (Stage 2) (Tower 2)",city:"Tel Aviv",height:null,floors:47,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-aminadav-towers-stage-2-3-x-47-fl-approved-lpc.2328405/",lat:32.06375,lng:34.75897},
{id:955,name:"Aminadav Towers (Stage 2) (Tower 3)",city:"Tel Aviv",height:null,floors:47,status:"Approved",url:"https://www.skyscrapercity.com/threads/tel-aviv-aminadav-towers-stage-2-3-x-47-fl-approved-lpc.2328405/",lat:32.06375,lng:34.75897},
{id:627,name:"Gabay Neot Afeka - Hadar Yosef",city:"Tel Aviv",height:null,floors:10,status:"Planned",lat:32.10513,lng:34.78941},
{id:628,name:"Seirovan Compound (Mezizim beach)",city:"Tel Aviv",height:null,floors:9,status:"Approved",lat:32.09651,lng:34.76984},
{id:629,name:"Utopia (Eshkol 103) (Tower 1)",city:"Tel Aviv",height:70.0,floors:16,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-utopia-eshkol-103-35-16-fl-136-70-m-prop.2393905/",lat:32.08789,lng:34.80028},
{id:935,name:"Utopia (Eshkol 103) (Tower 2)",city:"Tel Aviv",height:136.0,floors:35,status:"Proposed",url:"https://www.skyscrapercity.com/threads/tel-aviv-utopia-eshkol-103-35-16-fl-136-70-m-prop.2393905/",lat:32.08789,lng:34.80028},
{id:630,name:"HaNahala Tower",city:"Tel Aviv",height:106.5,floors:29,status:"Approved",lat:32.07927,lng:34.78071},
{id:631,name:"Shalhevet EB",city:"Tel Aviv",height:85.0,floors:7,status:"Approved",lat:32.07064,lng:34.76115},
{id:632,name:"TLYOU Tower (13-15 La Guardia)",city:"Tel Aviv",height:null,floors:8,status:"Planned",lat:32.06202,lng:34.79158},
{id:633,name:"Hadar Dafna VB",city:"Tel Aviv",height:null,floors:27,status:"Unknown",lat:32.1034,lng:34.77202},
{id:634,name:"Azrieli Town E",city:"Tel Aviv",height:258.0,floors:65,status:"Approved",lat:32.09478,lng:34.80245},
{id:635,name:"Kikar Atarim Towers (Tower 1)",city:"Tel Aviv",height:null,floors:25,status:"Approved",lat:32.08616,lng:34.78289},
{id:636,name:"Ahi Dakar EB",city:"Tel Aviv",height:null,floors:11,status:"Approved",lat:32.07754,lng:34.76332},
{id:637,name:"Dafna 504 (Azorim)",city:"Tel Aviv",height:null,floors:26,status:"Approved",lat:32.06892,lng:34.79376},
{id:638,name:"104-106 Bar Lev",city:"Tel Aviv",height:90.0,floors:9,status:"Approved",lat:32.0603,lng:34.77419},
{id:639,name:"71-75 HaShalom",city:"Tel Aviv",height:null,floors:8,status:"Approved",lat:32.10168,lng:34.80463},
{id:640,name:"Lapid Towers",city:"Tel Aviv",height:null,floors:60,status:"Proposed",lat:32.09306,lng:34.78506},
{id:641,name:"Acro Golf",city:"Tel Aviv",height:null,floors:18,status:"Topped Out",lat:32.08444,lng:34.7655},
{id:642,name:"Ribal Yad Harutzim",city:"Tel Aviv",height:180.0,floors:40,status:"Approved",lat:32.07582,lng:34.79593},
{id:643,name:"105-117 HaShalom",city:"Tel Aviv",height:null,floors:9,status:"Approved",lat:32.0672,lng:34.77637},
{id:644,name:"Kikar Shaked EB",city:"Tel Aviv",height:null,floors:10,status:"Approved",lat:32.10858,lng:34.7568},
{id:645,name:"Pardes Dalak",city:"Tel Aviv",height:null,floors:20,status:"Approved",lat:32.09996,lng:34.78723},
{id:646,name:"Elhanan East",city:"Tel Aviv",height:137.0,floors:38,status:"Proposed",lat:32.09133,lng:34.76767},
{id:647,name:"Eilat-Elifelet Tower",city:"Tel Aviv",height:90.0,floors:25,status:"Approved",lat:32.08271,lng:34.7981},
{id:648,name:"185-197 Yefet",city:"Tel Aviv",height:null,floors:8,status:"Proposed",lat:32.07409,lng:34.77854},
{id:649,name:"HaTzfira Tower",city:"Tel Aviv",height:156.0,floors:38,status:"Approved",lat:32.06547,lng:34.75897},
{id:650,name:"Beit Hadar EB",city:"Tel Aviv",height:null,floors:16,status:"Approved",lat:32.10685,lng:34.78941},
{id:651,name:"27-29 Shimoni",city:"Tel Aviv",height:null,floors:16,status:"Approved",lat:32.09823,lng:34.76984},
{id:652,name:"Dafna 503",city:"Tel Aviv",height:null,floors:26,status:"Approved",lat:32.08961,lng:34.80028},
{id:653,name:"Dan Ramat HaChayal",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.08099,lng:34.78071},
{id:654,name:"Enav La Guardia",city:"Tel Aviv",height:null,floors:29,status:"Approved",lat:32.07237,lng:34.76115},
{id:655,name:"Dafna 506 (Aura)",city:"Tel Aviv",height:106.0,floors:26,status:"Approved",lat:32.06375,lng:34.79158},
{id:656,name:"65-71 LaGuardia",city:"Tel Aviv",height:null,floors:10,status:"Planned",lat:32.10513,lng:34.77202},
{id:657,name:"Yigal Alon West",city:"Tel Aviv",height:240.0,floors:70,status:"Proposed",lat:32.09651,lng:34.80245},
{id:658,name:"Lodz EB",city:"Tel Aviv",height:null,floors:8,status:"Approved",lat:32.08789,lng:34.78289},
{id:659,name:"HaMasger 32",city:"Tel Aviv",height:85.0,floors:22,status:"Proposed",lat:32.07927,lng:34.76332},
{id:660,name:"2 Yehudit",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.07064,lng:34.79376},
{id:661,name:"173-183 Yefet",city:"Tel Aviv",height:null,floors:19,status:"Approved",lat:32.06202,lng:34.77419},
{id:662,name:"ICR Herbert Samuel (Tower 1)",city:"Tel Aviv",height:null,floors:26,status:"Approved",lat:32.1034,lng:34.80463},
{id:663,name:"Sonol Tower 2",city:"Tel Aviv",height:156.0,floors:41,status:"Approved",lat:32.09478,lng:34.78506},
{id:810,name:"Sonol Tower 1",city:"Tel Aviv",height:99.8,floors:29,status:"Completed",lat:32.09478,lng:34.78506},
{id:664,name:"63 Yehuda Halevi",city:"Tel Aviv",height:156.0,floors:45,status:"Approved",lat:32.08616,lng:34.7655},
{id:665,name:"Gabai Tel Aviv",city:"Tel Aviv",height:null,floors:17,status:"Under Construction",lat:32.07754,lng:34.79593},
{id:666,name:"8-12 HaSharon",city:"Tel Aviv",height:null,floors:35,status:"Approved",lat:32.06892,lng:34.77637},
{id:667,name:"Nahal Soreq EB",city:"Tel Aviv",height:null,floors:5,status:"Proposed",lat:32.0603,lng:34.7568},
{id:668,name:"Bezeq HaHagana",city:"Tel Aviv",height:null,floors:40,status:"Proposed",lat:32.10168,lng:34.78723},
{id:669,name:"Neve Eliezer EB",city:"Tel Aviv",height:null,floors:7,status:"Proposed",lat:32.09306,lng:34.76767},
{id:670,name:"41-43 Yehuda HaLevi",city:"Tel Aviv",height:160.0,floors:40,status:"Approved",lat:32.08444,lng:34.7981},
{id:671,name:"32 HaRakevet",city:"Tel Aviv",height:null,floors:30,status:"Approved",lat:32.07582,lng:34.77854},
{id:672,name:"Serlin EB",city:"Tel Aviv",height:null,floors:9,status:"Proposed",lat:32.0672,lng:34.75897},
{id:673,name:"Ma\'apilei Egoz 60-64 EB",city:"Tel Aviv",height:null,floors:5,status:"Approved",lat:32.10858,lng:34.78941},
{id:674,name:"14-26 Arber",city:"Tel Aviv",height:null,floors:18,status:"Approved",lat:32.09996,lng:34.76984},
{id:675,name:"Harkavy EB",city:"Tel Aviv",height:null,floors:8,status:"Proposed",lat:32.09133,lng:34.80028},
{id:676,name:"HaGibor HaAlmoni EB",city:"Tel Aviv",height:null,floors:18,status:"Proposed",lat:32.08271,lng:34.78071},
{id:677,name:"Ashdar Tagore",city:"Tel Aviv",height:null,floors:9,status:"Topped Out",lat:32.07409,lng:34.76115},
{id:678,name:"Menivim Tower",city:"Tel Aviv",height:null,floors:44,status:"Proposed",lat:32.06547,lng:34.79158},
{id:679,name:"Gabizon HaBosem EB",city:"Tel Aviv",height:null,floors:9,status:"Proposed",lat:32.10685,lng:34.77202},
{id:680,name:"Bar Lev / Zuckerman EB",city:"Tel Aviv",height:null,floors:9,status:"Proposed",lat:32.09823,lng:34.80245},
{id:681,name:"HaMaon EB",city:"Tel Aviv",height:null,floors:28,status:"Proposed",lat:32.08961,lng:34.78289},
{id:682,name:"7 HaYarkon",city:"Tel Aviv",height:102.5,floors:25,status:"Proposed",lat:32.08099,lng:34.76332},
{id:683,name:"HaBosem EB",city:"Tel Aviv",height:null,floors:17,status:"Proposed",lat:32.07237,lng:34.79376},
{id:684,name:"Nitsba Tower",city:"Tel Aviv",height:null,floors:64,status:"Approved",lat:32.06375,lng:34.77419},
{id:685,name:"23-27 HaYarkon",city:"Tel Aviv",height:80.0,floors:18,status:"Approved",lat:32.10513,lng:34.80463},
{id:686,name:"Zahala Towers",city:"Tel Aviv",height:null,floors:11,status:"Completed",lat:32.09651,lng:34.78506},
{id:687,name:"Recanati Residence",city:"Tel Aviv",height:null,floors:18,status:"Completed",lat:32.08789,lng:34.7655},
{id:688,name:"Levinsky EB",city:"Tel Aviv",height:null,floors:17,status:"Approved",lat:32.07927,lng:34.79593},
{id:689,name:"Ahimeir Tower",city:"Tel Aviv",height:null,floors:20,status:"Completed",lat:32.07064,lng:34.77637},
{id:690,name:"Elad Park TLV",city:"Tel Aviv",height:null,floors:18,status:"Completed",lat:32.06202,lng:34.7568},
{id:691,name:"HaArad Complex",city:"Tel Aviv",height:140.0,floors:10,status:"Approved",lat:32.1034,lng:34.78723},
{id:692,name:"Azrieli Town (Residential Tower)",city:"Tel Aviv",height:156.0,floors:40,status:"Topped Out",lat:32.09478,lng:34.76767},
{id:785,name:"Azrieli Town (Office Tower)",city:"Tel Aviv",height:175.0,floors:50,status:"Completed",lat:32.09478,lng:34.76767},
{id:693,name:"17 Aminadav",city:"Tel Aviv",height:null,floors:16,status:"Approved",lat:32.08616,lng:34.7981},
{id:694,name:"Dofen Kfar Shalem",city:"Tel Aviv",height:null,floors:10,status:"Proposed",lat:32.07754,lng:34.77854},
{id:695,name:"Levana West EB",city:"Tel Aviv",height:null,floors:25,status:"Approved",lat:32.06892,lng:34.75897},
{id:696,name:"Phoenix Towers (Office Tower)",city:"Tel Aviv",height:165.0,floors:40,status:"Approved",lat:32.0603,lng:34.78941},
{id:697,name:"Elifelet East",city:"Tel Aviv",height:null,floors:40,status:"Approved",lat:32.10168,lng:34.76984},
{id:698,name:"114 Begin",city:"Tel Aviv",height:56.0,floors:15,status:"Approved",lat:32.09306,lng:34.80028},
{id:699,name:"Begin-Sadeh Tower",city:"Tel Aviv",height:null,floors:50,status:"Planned",lat:32.08444,lng:34.78071},
{id:700,name:"HaHagana EB",city:"Tel Aviv",height:null,floors:30,status:"Proposed",lat:32.07582,lng:34.76115},
{id:701,name:"Arlozorov 25-35",city:"Tel Aviv",height:null,floors:20,status:"Proposed",lat:32.0672,lng:34.79158},
{id:702,name:"2-12 Nirim",city:"Tel Aviv",height:null,floors:29,status:"Proposed",lat:32.10858,lng:34.77202},
{id:703,name:"We TLV",city:"Tel Aviv",height:110.0,floors:30,status:"Completed",lat:32.09996,lng:34.80245},
{id:704,name:"Daniel Moritz 14-28",city:"Tel Aviv",height:null,floors:16,status:"Approved",lat:32.09133,lng:34.78289},
{id:705,name:"Dan Hotel",city:"Tel Aviv",height:null,floors:14,status:"Proposed",lat:32.08271,lng:34.76332},
{id:706,name:"Har Tsion Ha\'Amal EB",city:"Tel Aviv",height:null,floors:20,status:"Proposed",lat:32.07409,lng:34.79376},
{id:707,name:"Dimri Bavli Tower",city:"Tel Aviv",height:null,floors:41,status:"Proposed",lat:32.06547,lng:34.77419},
{id:708,name:"Ben Zvi-Gaon Tower",city:"Tel Aviv",height:null,floors:25,status:"Approved",lat:32.10685,lng:34.80463},
{id:709,name:"Yefet Farm EB",city:"Tel Aviv",height:null,floors:25,status:"Approved",lat:32.09823,lng:34.78506},
{id:710,name:"HaMa\'avak EB",city:"Tel Aviv",height:null,floors:26,status:"Approved",lat:32.08961,lng:34.7655},
{id:711,name:"Ben Zvi Tower",city:"Tel Aviv",height:null,floors:29,status:"Approved",lat:32.08099,lng:34.79593},
{id:712,name:"Amot Insurance House",city:"Tel Aviv",height:null,floors:40,status:"Proposed",lat:32.07237,lng:34.77637},
{id:713,name:"Philharmonic Towers (Tower 1)",city:"Tel Aviv",height:null,floors:12,status:"Completed",lat:32.06375,lng:34.7568},
{id:714,name:"Isrotel Tel Aviv Port Hotel",city:"Tel Aviv",height:null,floors:16,status:"Completed",lat:32.10513,lng:34.78723},
{id:715,name:"HaShomron Complex (Old Central Bus Station)",city:"Tel Aviv",height:null,floors:30,status:"Approved",lat:32.09651,lng:34.76767},
{id:716,name:"Sky Tower",city:"Tel Aviv",height:null,floors:31,status:"Completed",lat:32.08789,lng:34.7981},
{id:717,name:"H Sportek TLV",city:"Tel Aviv",height:96.0,floors:25,status:"Completed",lat:32.07927,lng:34.77854},
{id:718,name:"Beit Lessin",city:"Tel Aviv",height:100.0,floors:28,status:"Completed",lat:32.07064,lng:34.75897},
{id:719,name:"David Promenade Residences",city:"Tel Aviv",height:102.0,floors:31,status:"Completed",lat:32.06202,lng:34.78941},
{id:720,name:"Aviv Lieber Tower",city:"Tel Aviv",height:100.0,floors:30,status:"Completed",lat:32.1034,lng:34.76984},
{id:721,name:"Arc",city:"Tel Aviv",height:45.0,floors:13,status:"Completed",lat:32.09478,lng:34.80028},
{id:722,name:"Amot Tower",city:"Tel Aviv",height:null,floors:45,status:"Planned",lat:32.08616,lng:34.78071},
{id:723,name:"Acro tower (formerly Shevet Moshe tower)",city:"Tel Aviv",height:141.0,floors:null,status:"Completed",lat:32.07754,lng:34.76115},
{id:724,name:"Hotel Rothschild 65",city:"Tel Aviv",height:null,floors:9,status:"Completed",lat:32.06892,lng:34.79158},
{id:725,name:"Gindi Sarona",city:"Tel Aviv",height:110.0,floors:31,status:"Completed",lat:32.0603,lng:34.77202},
{id:726,name:"H Tower",city:"Tel Aviv",height:138.0,floors:null,status:"Completed",lat:32.10168,lng:34.80245},
{id:727,name:"Sitonai Market - Gindi Tel Aviv",city:"Tel Aviv",height:null,floors:16,status:"Completed",lat:32.09306,lng:34.78289},
{id:728,name:"10 Herbert Samuel",city:"Tel Aviv",height:80.0,floors:22,status:"Completed",lat:32.08444,lng:34.76332},
{id:729,name:"Florentin Village",city:"Tel Aviv",height:null,floors:10,status:"Completed",lat:32.07582,lng:34.79376},
{id:730,name:"Adgar C",city:"Tel Aviv",height:null,floors:17,status:"Completed",lat:32.0672,lng:34.77419},
{id:731,name:"Oro Tower",city:"Tel Aviv",height:null,floors:13,status:"Completed",lat:32.10858,lng:34.80463},
{id:732,name:"Hasan Arfe C4 + C5",city:"Tel Aviv",height:180.0,floors:47,status:"Approved",lat:32.09996,lng:34.78506},
{id:733,name:"NINE Tel Aviv",city:"Tel Aviv",height:null,floors:14,status:"Completed",lat:32.09133,lng:34.7655},
{id:734,name:"Levi Eshkol 61",city:"Tel Aviv",height:null,floors:8,status:"Topped Out",lat:32.08271,lng:34.79593},
{id:735,name:"Meitav Tel Aviv (formerly Alon Tower)/Aminadav 7",city:"Tel Aviv",height:null,floors:27,status:"Completed",lat:32.07409,lng:34.77637},
{id:736,name:"Electra Tower",city:"Tel Aviv",height:165.0,floors:null,status:"Completed",lat:32.06547,lng:34.7568},
{id:737,name:"Alon Towers (BSR Center TLV, Tower 1)",city:"Tel Aviv",height:162.0,floors:45,status:"Completed",lat:32.10685,lng:34.78723},
{id:850,name:"Alon Towers (BSR Center TLV, Tower 2)",city:"Tel Aviv",height:162.0,floors:45,status:"Completed",lat:32.10685,lng:34.78723},
{id:738,name:"Suzuki Tower",city:"Tel Aviv",height:80.0,floors:21,status:"Completed",lat:32.09823,lng:34.76767},
{id:739,name:"17 Arlozorov",city:"Tel Aviv",height:115.0,floors:30,status:"Completed",lat:32.08961,lng:34.7981},
{id:740,name:"29 HaYarkon",city:"Tel Aviv",height:70.0,floors:21,status:"Completed",lat:32.08099,lng:34.77854},
{id:741,name:"Remez 6th",city:"Tel Aviv",height:119.0,floors:null,status:"Completed",lat:32.07237,lng:34.75897},
{id:742,name:"Geula 14",city:"Tel Aviv",height:50.0,floors:14,status:"Completed",lat:32.06375,lng:34.78941},
{id:743,name:"ICON TLV, Ibn Gabirol",city:"Tel Aviv",height:null,floors:6,status:"Completed",lat:32.10513,lng:34.76984},
{id:744,name:"17 Rothschild",city:"Tel Aviv",height:86.0,floors:21,status:"Completed",lat:32.09651,lng:34.80028},
{id:745,name:"Assuta Tower",city:"Tel Aviv",height:104.0,floors:26,status:"Completed",lat:32.08789,lng:34.78071},
{id:746,name:"Broshim Dorms Tel Aviv University",city:"Tel Aviv",height:70.0,floors:9,status:"Completed",lat:32.07927,lng:34.76115},
{id:747,name:"Green Park",city:"Tel Aviv",height:null,floors:27,status:"Completed",lat:32.07064,lng:34.79158},
{id:748,name:"Sourasky Medical Staff Tower",city:"Tel Aviv",height:120.0,floors:30,status:"Completed",lat:32.06202,lng:34.77202},
{id:749,name:"Ambassador Hotel",city:"Tel Aviv",height:86.0,floors:27,status:"Approved",lat:32.1034,lng:34.80245},
{id:750,name:"White City Residence",city:"Tel Aviv",height:115.0,floors:29,status:"Completed",lat:32.09478,lng:34.78289},
{id:751,name:"22 Rothschild - Aviv Tower",city:"Tel Aviv",height:130.0,floors:30,status:"Completed",lat:32.08616,lng:34.76332},
{id:833,name:"1 Rothschild Boulevard",city:"Tel Aviv",height:120.2,floors:32,status:"Completed",lat:32.06544,lng:34.77451},
{id:829,name:"Neve Tzedek Tower",city:"Tel Aviv",height:147.0,floors:44,status:"Completed",lat:32.0596,lng:34.7639},
{id:752,name:"Kfir Tower",city:"Tel Aviv",height:70.0,floors:19,status:"Topped Out",lat:32.07754,lng:34.79376},
{id:753,name:"W Prime",city:"Tel Aviv",height:150.0,floors:46,status:"Completed",lat:32.06892,lng:34.77419},
{id:807,name:"H Recital Tower",city:"Tel Aviv",height:153.0,floors:34,status:"Completed",lat:32.06481,lng:34.77265},
{id:806,name:"W-Tower",city:"Tel Aviv",height:156.0,floors:46,status:"Completed",lat:32.09779,lng:34.79587},
{id:754,name:"H Beit Zuri",city:"Tel Aviv",height:40.0,floors:12,status:"Completed",lat:32.0603,lng:34.80463},
{id:755,name:"26 Eliphelet",city:"Tel Aviv",height:null,floors:14,status:"Completed",lat:32.10168,lng:34.78506},
{id:756,name:"Blue Tel Aviv",city:"Tel Aviv",height:45.0,floors:13,status:"Completed",lat:32.09306,lng:34.7655},
{id:757,name:"Savyonei Ramat Aviv 10",city:"Tel Aviv",height:null,floors:22,status:"Completed",lat:32.08444,lng:34.79593},
{id:758,name:"Savyonei Ramat Aviv",city:"Tel Aviv",height:60.0,floors:18,status:"Completed",lat:32.07582,lng:34.77637},
{id:759,name:"TLV Train Towers - MR58 (Tower 1)",city:"Tel Aviv",height:90.0,floors:24,status:"Completed",lat:32.0672,lng:34.7568},
{id:760,name:"Migdal-Top Towers",city:"Tel Aviv",height:90.0,floors:25,status:"Approved",lat:32.10858,lng:34.78723},
{id:761,name:"7-9 Einstein Towers (Tower 1)",city:"Tel Aviv",height:50.0,floors:14,status:"Completed",lat:32.09996,lng:34.76767},
{id:762,name:"Adgar 360 (formerly Galit Tower)",city:"Tel Aviv",height:140.0,floors:36,status:"Completed",lat:32.09133,lng:34.7981},
{id:763,name:"BSR Tzameret Tower 2",city:"Tel Aviv",height:102.0,floors:30,status:"Completed",lat:32.08271,lng:34.77854},
{id:781,name:"BSR Tzameret Tower 3",city:"Tel Aviv",height:102.0,floors:30,status:"Completed",lat:32.08271,lng:34.77854},
{id:820,name:"Tzameret Towers (Tower 1)",city:"Tel Aviv",height:123.0,floors:34,status:"Completed",lat:32.09084,lng:34.79387},
{id:821,name:"Tzameret Towers (Tower 2)",city:"Tel Aviv",height:123.0,floors:34,status:"Completed",lat:32.09084,lng:34.79387},
{id:822,name:"Tzameret Towers (Tower 3)",city:"Tel Aviv",height:123.0,floors:34,status:"Completed",lat:32.09084,lng:34.79387},
{id:827,name:"Manhattan Tower",city:"Tel Aviv",height:140.0,floors:41,status:"Completed",lat:32.09084,lng:34.79387},
{id:764,name:"CU office park",city:"Tel Aviv",height:null,floors:15,status:"Completed",lat:32.07409,lng:34.75897},
{id:765,name:"ME Tel Aviv",city:"Tel Aviv",height:70.0,floors:22,status:"Completed",lat:32.06547,lng:34.78941},
{id:766,name:"29 Soutine",city:"Tel Aviv",height:100.0,floors:29,status:"Completed",lat:32.10685,lng:34.76984},
{id:767,name:"W Boutique",city:"Tel Aviv",height:108.0,floors:31,status:"Completed",lat:32.09823,lng:34.80028},
{id:768,name:"Or Bavli Towers (Tower 1)",city:"Tel Aviv",height:100.0,floors:28,status:"Cancelled",lat:32.08961,lng:34.78071},
{id:769,name:"Frishman 46th",city:"Tel Aviv",height:108.0,floors:28,status:"Completed",lat:32.08099,lng:34.76115},
{id:770,name:"Ne\'eman Towers (Tower 1)",city:"Tel Aviv",height:45.0,floors:13,status:"Completed",lat:32.07237,lng:34.79158},
{id:771,name:"Tel Aviv Towers (Tower 3)",city:"Tel Aviv",height:140.0,floors:34,status:"Completed",lat:32.06375,lng:34.77202},
{id:782,name:"Tel Aviv Towers (Tower 4)",city:"Tel Aviv",height:140.0,floors:34,status:"Completed",lat:32.06375,lng:34.77202},
{id:823,name:"Tel Aviv Towers (Tower 1)",city:"Tel Aviv",height:107.75,floors:34,status:"Completed",lat:32.06375,lng:34.77202},
{id:824,name:"Tel Aviv Towers (Tower 2)",city:"Tel Aviv",height:107.75,floors:34,status:"Completed",lat:32.06375,lng:34.77202},
{id:772,name:"Hagag Tower",city:"Tel Aviv",height:180.0,floors:50,status:"Unknown",lat:32.10513,lng:34.80245},
{id:830,name:"Shalom Meir Tower",city:"Tel Aviv",height:129.0,floors:34,status:"Completed",lat:32.06402,lng:34.76977},
{id:831,name:"Marganit Tower",city:"Tel Aviv",height:138.0,floors:17,status:"Completed",lat:32.07528,lng:34.78833},
{id:773,name:"Sea One Tower",city:"Tel Aviv",height:100.0,floors:28,status:"Completed",lat:32.09651,lng:34.78289},
{id:774,name:"Ma\'ariv House",city:"Tel Aviv",height:108.0,floors:27,status:"Proposed",lat:32.08789,lng:34.76332},
{id:775,name:"Gindi Vision",city:"Tel Aviv",height:73.0,floors:20,status:"Completed",lat:32.07927,lng:34.79376},
{id:776,name:"Park Tzameret",city:"Tel Aviv",height:156.0,floors:46,status:"Completed",lat:32.07064,lng:34.77419},
{id:777,name:"HaShoftim Tower (G Tel Aviv)",city:"Tel Aviv",height:null,floors:23,status:"Completed",lat:32.06202,lng:34.80463},
{id:851,name:"Seminar HaKibbutzim Towers (Tower 2)",city:"Tel Aviv",height:130.0,floors:35,status:"Proposed",lat:32.06375,lng:34.79593},
{id:852,name:"Seminar HaKibbutzim Towers (Tower 3)",city:"Tel Aviv",height:130.0,floors:35,status:"Proposed",lat:32.06375,lng:34.79593},
{id:853,name:"Yam towers, frmr Minrav Yam (Tower 2)",city:"Bat Yam",height:115.0,floors:33,status:"Completed",lat:32.01577,lng:34.76171},
{id:854,name:"Highline towers (formerly HaMatmid Towers) (Tower 2)",city:"Ramat Gan",height:106.0,floors:30,status:"Completed",lat:32.05676,lng:34.81773},
{id:855,name:"Wiin Towers (Fichman Holon) (Tower 2)",city:"Holon",height:97.0,floors:26,status:"Topped Out",lat:32.00675,lng:34.7749},
{id:856,name:"Tzamarot Dan Towers (Tower 2)",city:"Petah Tikva",height:95.0,floors:30,status:"Completed",lat:32.09691,lng:34.89418},
{id:857,name:"TLV Train Towers - MR58 (Tower 2)",city:"Tel Aviv",height:90.0,floors:24,status:"Completed",lat:32.0672,lng:34.7568},
{id:858,name:"Naveh Towers (Tower 2)",city:"Holon",height:75.0,floors:23,status:"Completed",lat:32.0033,lng:34.77816},
{id:859,name:"7-9 Einstein Towers (Tower 2)",city:"Tel Aviv",height:50.0,floors:14,status:"Completed",lat:32.09996,lng:34.76767},
{id:860,name:"Ne\'eman Towers (Tower 2)",city:"Tel Aviv",height:45.0,floors:13,status:"Completed",lat:32.07237,lng:34.79158},
{id:861,name:"Ne\'eman Towers (Tower 3)",city:"Tel Aviv",height:45.0,floors:13,status:"Completed",lat:32.07237,lng:34.79158},
{id:862,name:"Cinerama Towers (Tower 2)",city:"Tel Aviv",height:null,floors:46,status:"Approved",lat:32.0672,lng:34.76332},
{id:863,name:"Cinerama Towers (Tower 3)",city:"Tel Aviv",height:null,floors:46,status:"Approved",lat:32.0672,lng:34.76332},
{id:864,name:"Cinerama Towers (Tower 4)",city:"Tel Aviv",height:null,floors:46,status:"Approved",lat:32.0672,lng:34.76332},
{id:865,name:"BIG Kaniel Towers (Tower 2)",city:"Petah Tikva",height:null,floors:40,status:"Under Construction",lat:32.0926,lng:34.88983},
{id:866,name:"BIG Kaniel Towers (Tower 3)",city:"Petah Tikva",height:null,floors:40,status:"Under Construction",lat:32.0926,lng:34.88983},
{id:867,name:"BIG Kaniel Towers (Tower 4)",city:"Petah Tikva",height:null,floors:40,status:"Under Construction",lat:32.0926,lng:34.88983},
{id:868,name:"BIG Kaniel Towers (Tower 5)",city:"Petah Tikva",height:null,floors:40,status:"Under Construction",lat:32.0926,lng:34.88983},
{id:869,name:"Castro Towers (Tower 2)",city:"Bat Yam",height:null,floors:40,status:"Approved",lat:32.01319,lng:34.75954},
{id:870,name:"NEARO Towers (Tower 2)",city:"Petah Tikva",height:null,floors:25,status:"Topped Out",lat:32.09519,lng:34.89853},
{id:871,name:"Baron Towers (Tower 2)",city:"Petah Tikva",height:null,floors:22,status:"Completed",lat:32.0926,lng:34.89744},
{id:872,name:"Metro Towers Bat Yam (Tower 2)",city:"Bat Yam",height:null,floors:24,status:"Approved",lat:32.03043,lng:34.75084},
{id:873,name:"Sharonim Towers (Tower 2)",city:"Petah Tikva",height:null,floors:25,status:"Marketing",lat:32.09088,lng:34.87896},
{id:874,name:"Gavriel Towers (Tower 2)",city:"Rehovot",height:null,floors:21,status:"Under Construction",lat:31.90117,lng:34.80777},
{id:875,name:"BSR 1K Residential Towers (Tower 2)",city:"Rishon LeZion",height:null,floors:21,status:"Proposed",lat:31.96395,lng:34.78543},
{id:876,name:"Krause Towers (Tower 2)",city:"Holon",height:null,floors:30,status:"Completed",lat:32.02054,lng:34.77599},
{id:877,name:"Electra Towers (Tower 2)",city:"Ramla",height:null,floors:21,status:"Under Construction",lat:31.93407,lng:34.85109},
{id:878,name:"Electra Towers (Tower 3)",city:"Ramla",height:null,floors:21,status:"Under Construction",lat:31.93407,lng:34.85109},
{id:879,name:"Kikar Atarim Towers (Tower 2)",city:"Tel Aviv",height:null,floors:25,status:"Approved",lat:32.08616,lng:34.78289},
{id:880,name:"Philharmonic Towers (Tower 2)",city:"Tel Aviv",height:null,floors:12,status:"Completed",lat:32.06375,lng:34.7568},
{id:881,name:"Mala Towers (Tower 2)",city:"Petah Tikva",height:null,floors:25,status:"Marketing",lat:32.07881,lng:34.87679},
{id:882,name:"Aura Ramat Hen (Tower 2)",city:"Ramat Gan",height:110.0,floors:30,status:"Topped Out",lat:32.07745,lng:34.81882},
{id:883,name:"Aura Ramat Hen (Tower 3)",city:"Ramat Gan",height:110.0,floors:30,status:"Topped Out",lat:32.07745,lng:34.81882},
{id:884,name:"WAVE Givat Shmuel (Tower 2)",city:"Givat Shmuel",height:null,floors:23,status:"Topped Out",lat:32.07442,lng:34.84668},
{id:885,name:"Avgad Teo (Tower 2)",city:"Ramla",height:null,floors:25,status:"Under Construction",lat:31.9332,lng:34.86196},
{id:886,name:"Avgad Teo (Tower 3)",city:"Ramla",height:null,floors:25,status:"Under Construction",lat:31.9332,lng:34.86196},
{id:887,name:"Avgad Teo (Tower 4)",city:"Ramla",height:null,floors:25,status:"Under Construction",lat:31.9332,lng:34.86196},
{id:888,name:"Avgad Teo (Tower 5)",city:"Ramla",height:null,floors:25,status:"Under Construction",lat:31.9332,lng:34.86196},
{id:889,name:"Alfa Rishon LeZion (Tower 2)",city:"Rishon LeZion",height:null,floors:18,status:"Under Construction",lat:31.97171,lng:34.79848},
{id:890,name:"Alfa Rishon LeZion (Tower 3)",city:"Rishon LeZion",height:null,floors:18,status:"Under Construction",lat:31.97171,lng:34.79848},
{id:891,name:"Alfa Rishon LeZion (Tower 4)",city:"Rishon LeZion",height:null,floors:18,status:"Under Construction",lat:31.97171,lng:34.79848},
{id:892,name:"Alfa Rishon LeZion (Tower 5)",city:"Rishon LeZion",height:null,floors:18,status:"Under Construction",lat:31.97171,lng:34.79848},
{id:893,name:"Unik Cardo Nachalat Yehuda (Tower 2)",city:"Rishon LeZion",height:null,floors:24,status:"Under Construction",lat:31.98205,lng:34.80174},
{id:894,name:"Unik Cardo Nachalat Yehuda (Tower 3)",city:"Rishon LeZion",height:null,floors:24,status:"Under Construction",lat:31.98205,lng:34.80174},
{id:895,name:"Unik Cardo (Tower 2)",city:"Rishon LeZion",height:null,floors:25,status:"Under Construction",lat:31.97602,lng:34.78326},
{id:896,name:"Unik Cardo (Tower 3)",city:"Rishon LeZion",height:null,floors:25,status:"Under Construction",lat:31.97602,lng:34.78326},
{id:897,name:"Unik Cardo (Tower 4)",city:"Rishon LeZion",height:null,floors:25,status:"Under Construction",lat:31.97602,lng:34.78326},
{id:898,name:"Zarfati Selected (Tower 2)",city:"Rishon LeZion",height:null,floors:31,status:"Under Construction",lat:31.98378,lng:34.78543},
{id:899,name:"Zarfati Selected (Tower 3)",city:"Rishon LeZion",height:null,floors:31,status:"Under Construction",lat:31.98378,lng:34.78543},
{id:900,name:"ICR Herbert Samuel (Tower 2)",city:"Tel Aviv",height:null,floors:26,status:"Approved",lat:32.1034,lng:34.80463},
{id:901,name:"Agish Reved & New Kiriyah towers (Agish Reved)",city:"Tel Aviv",height:345.0,floors:80,status:"Proposed",lat:32.09133,lng:34.76984},
{id:902,name:"Phoenix Towers (Residential Tower 1)",city:"Tel Aviv",height:100.0,floors:27,status:"Approved",lat:32.0603,lng:34.78941},
{id:903,name:"Phoenix Towers (Residential Tower 2)",city:"Tel Aviv",height:100.0,floors:27,status:"Approved",lat:32.0603,lng:34.78941},
{id:904,name:"Insurance companies towers (Tower B)",city:"Tel Aviv",height:155.5,floors:40,status:"Planned",lat:32.06892,lng:34.78071},
{id:905,name:"Insurance companies towers (Tower C)",city:"Tel Aviv",height:120.25,floors:30,status:"Planned",lat:32.06892,lng:34.78071},
{id:906,name:"Or Bavli Towers (Tower 2)",city:"Tel Aviv",height:100.0,floors:20,status:"Cancelled",lat:32.08961,lng:34.78071},
{id:907,name:"Elita Towers (Tower 2)",city:"Ramat Gan",height:null,floors:30,status:"Planned",lat:32.06883,lng:34.83621},
{id:908,name:"LYFE Towers, fmr Dan Towers (Tower A)",city:"Bnei Brak",height:null,floors:44,status:"Completed",lat:32.09234,lng:34.82673},
{id:909,name:"LYFE Towers, fmr Dan Towers (Tower B)",city:"Bnei Brak",height:null,floors:40,status:"Completed",lat:32.09234,lng:34.82673},
{id:910,name:"B Towers (Tower 2)",city:"Bat Yam",height:null,floors:30,status:"On Hold",lat:32.02181,lng:34.73997},
{id:911,name:"Tr3s (Krol Towers) (Tower 2)",city:"Petah Tikva",height:null,floors:30,status:"Planned",lat:32.08829,lng:34.88005},
{id:912,name:"Tr3s (Krol Towers) (Tower 3)",city:"Petah Tikva",height:null,floors:25,status:"Planned",lat:32.08829,lng:34.88005},
{id:913,name:"Sophy Towers (Tower I)",city:"Petah Tikva",height:null,floors:16,status:"Topped Out",lat:32.0745,lng:34.88331},
{id:914,name:"Garden Towers (Tower 2)",city:"Bat Yam",height:null,floors:27,status:"Marketing",lat:32.0287,lng:34.74215},
{id:915,name:"Etos Towers (Tower 2)",city:"Petah Tikva",height:null,floors:18,status:"Under Construction",lat:32.09347,lng:34.89635},
{id:916,name:"Etos Towers (Tower 3)",city:"Petah Tikva",height:null,floors:7,status:"Under Construction",lat:32.09347,lng:34.89635},
{id:917,name:"Etos Towers (Tower 4)",city:"Petah Tikva",height:null,floors:7,status:"Under Construction",lat:32.09347,lng:34.89635},
{id:918,name:"Solomon Towers (Tower 1)",city:"Rishon LeZion",height:null,floors:25,status:"Approved",lat:31.97429,lng:34.78217},
{id:919,name:"Talpiot Towers (Tower 1)",city:"Ramat Gan",height:null,floors:19,status:"Proposed",lat:32.0628,lng:34.83621},
{id:920,name:"Shbiro Towers (18fl Tower 2)",city:"Ramat Gan",height:null,floors:18,status:"Completed",lat:32.07228,lng:34.82208},
{id:921,name:"Shbiro Towers (15fl Tower)",city:"Ramat Gan",height:null,floors:15,status:"Completed",lat:32.07228,lng:34.82208},
{id:922,name:"Mika Towers (Tower 2)",city:"Holon",height:null,floors:22,status:"Proposed",lat:32.01451,lng:34.7912},
{id:923,name:"Solelim Towers (35fl Tower 1)",city:"Tel Aviv",height:null,floors:35,status:"Completed",lat:32.07409,lng:34.7655},
{id:924,name:"Solelim Towers (35fl Tower 2)",city:"Tel Aviv",height:null,floors:35,status:"Completed",lat:32.07409,lng:34.7655},
{id:925,name:"Solelim Towers (13fl Tower)",city:"Tel Aviv",height:null,floors:13,status:"Completed",lat:32.07409,lng:34.7655},
{id:926,name:"BST Towers (BSTowers) (27fl Tower)",city:"Petah Tikva",height:null,floors:27,status:"Under Construction",lat:32.09864,lng:34.892},
{id:927,name:"Ybox Gat Rimon Tower (Tower 2)",city:"Tel Aviv",height:null,floors:41,status:"Approved",lat:32.0603,lng:34.77854},
{id:928,name:"Kalanit Towers (Tower 2)",city:"Kiryat Ono",height:null,floors:18,status:"Completed",lat:32.04797,lng:34.86484},
{id:929,name:"Kalanit Towers (Tower 3)",city:"Kiryat Ono",height:null,floors:18,status:"Completed",lat:32.04797,lng:34.86484},
{id:930,name:"Kalanit Towers (Tower 4)",city:"Kiryat Ono",height:null,floors:18,status:"Completed",lat:32.04797,lng:34.86484},
{id:931,name:"Kalanit Towers (Tower 5)",city:"Kiryat Ono",height:null,floors:18,status:"Completed",lat:32.04797,lng:34.86484},
{id:932,name:"Song Towers (Tower 2)",city:"Givat Shmuel",height:null,floors:21,status:"Completed",lat:32.08908,lng:34.84777},
{id:933,name:"Song Towers (Tower 3)",city:"Givat Shmuel",height:null,floors:21,status:"Completed",lat:32.08908,lng:34.84777},
];

const CORE_CITIES = ["Tel Aviv","Bat Yam","Ramat Gan","Givatayim","Bnei Brak","Holon","Or Yehuda","Givat Shmuel","Kiryat Ono"];
const CORE_COLOR = {
  "Tel Aviv": "#2F6F62", "Ramat Gan": "#C9932E", "Bnei Brak": "#B25D3B",
  "Givatayim": "#3A4E63", "Petah Tikva": "#7B5EA7", "Bat Yam": "#1F7A99", "Holon": "#A34A6F",
};
const OTHER_COLOR = "#9A9482";
function cityColor(city) { return CORE_COLOR[city] || OTHER_COLOR; }

const STATUS_COLOR = {
  "Completed": "#2F6F62", "Topped Out": "#4C7A8C", "Under Construction": "#C9932E",
  "Approved": "#B25D3B", "Proposed": "#9A9482", "Planned": "#9A9482",
  "Marketing": "#7B5EA7", "On Hold": "#A34A6F", "Cancelled": "#8B3A3A", "Unknown": "#B7AF98",
};
function statusColor(s) { return STATUS_COLOR[s] || "#9A9482"; }

const ALL_CITIES = Array.from(new Set(RAW_DATA.map(b => b.city))).sort((a,b) => {
  const ac = CORE_CITIES.indexOf(a), bc = CORE_CITIES.indexOf(b);
  if (ac !== -1 && bc !== -1) return ac - bc;
  if (ac !== -1) return -1;
  if (bc !== -1) return 1;
  return a.localeCompare(b);
});
const STATUS_ORDER = ["Completed","Topped Out","Under Construction","Approved","Proposed","Planned","Marketing","On Hold","Cancelled","Unknown"];
const STATUSES = STATUS_ORDER.filter(s => RAW_DATA.some(b => b.status === s));

const PAGE_SIZES = [25, 60, 100, 250];

const HEIGHT_BRACKETS = [
  { key: "all", label: "All heights" },
  { key: "under150", label: "Under 150m" },
  { key: "150", label: "150m+" },
  { key: "200", label: "200m+" },
  { key: "300", label: "300m+" },
];
function matchesHeightBracket(b, bracket) {
  if (bracket === "all") return true;
  if (b.height == null) return false;
  if (bracket === "under150") return b.height < 150;
  return b.height >= Number(bracket);
}

function GushDanSkyline() {
  const [citySet, setCitySet] = useState(() => new Set());
  const [statusSet, setStatusSet] = useState(() => new Set());
  const [heightBracket, setHeightBracket] = useState("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("height");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(60);
  const [hovered, setHovered] = useState(null);
  const [onlyCore, setOnlyCore] = useState(false);

  const scopedRows = useMemo(() => {
    return onlyCore ? RAW_DATA.filter(b => CORE_CITIES.includes(b.city)) : RAW_DATA;
  }, [onlyCore]);

  // counts for picker options, computed against the current scope + other active filters
  const cityCounts = useMemo(() => {
    const m = new Map();
    for (const b of scopedRows) {
      if (statusSet.size > 0 && !statusSet.has(b.status)) continue;
      if (!matchesHeightBracket(b, heightBracket)) continue;
      if (query && !b.name.toLowerCase().includes(query.toLowerCase()) && !b.city.toLowerCase().includes(query.toLowerCase())) continue;
      m.set(b.city, (m.get(b.city) || 0) + 1);
    }
    return m;
  }, [scopedRows, statusSet, heightBracket, query]);

  const statusCounts = useMemo(() => {
    const m = new Map();
    for (const b of scopedRows) {
      if (citySet.size > 0 && !citySet.has(b.city)) continue;
      if (!matchesHeightBracket(b, heightBracket)) continue;
      if (query && !b.name.toLowerCase().includes(query.toLowerCase()) && !b.city.toLowerCase().includes(query.toLowerCase())) continue;
      m.set(b.status, (m.get(b.status) || 0) + 1);
    }
    return m;
  }, [scopedRows, citySet, heightBracket, query]);

  const filtered = useMemo(() => {
    let rows = scopedRows.filter((b) => {
      if (citySet.size > 0 && !citySet.has(b.city)) return false;
      if (statusSet.size > 0 && !statusSet.has(b.status)) return false;
      if (!matchesHeightBracket(b, heightBracket)) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!b.name.toLowerCase().includes(q) && !b.city.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    rows.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "name" || sortKey === "city" || sortKey === "status") return a[sortKey].localeCompare(b[sortKey]) * dir;
      const av = a[sortKey], bv = b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return (av - bv) * dir;
    });
    return rows;
  }, [scopedRows, citySet, statusSet, heightBracket, query, sortKey, sortDir]);

  const filtersActive = citySet.size > 0 || statusSet.size > 0 || heightBracket !== "all" || query !== "" || onlyCore;
  function clearFilters() {
    setCitySet(new Set()); setStatusSet(new Set()); setHeightBracket("all"); setQuery(""); setOnlyCore(false); setPage(0);
  }
  function toggleCity(value) {
    setCitySet(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value); else next.add(value);
      return next;
    });
    setPage(0);
  }
  function toggleStatus(value) {
    setStatusSet(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value); else next.add(value);
      return next;
    });
    setPage(0);
  }

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const skylineData = useMemo(() => {
    return filtered.filter(b => b.height).sort((a,b) => b.height - a.height).slice(0, 90);
  }, [filtered]);
  const skylineMax = Math.max(...skylineData.map(b => b.height), 1);

  const stats = useMemo(() => {
    const builtTall = RAW_DATA.filter(b => (b.status === "Completed" || b.status === "Topped Out") && b.height >= 150);
    const tallest = [...RAW_DATA].filter(b => b.height && b.status === "Completed").sort((a, b) => b.height - a.height)[0];
    const toppedOut = RAW_DATA.filter(b => b.status === "Topped Out" && b.height >= 150).length;
    const uc = RAW_DATA.filter(b => b.status === "Under Construction" && b.height >= 150).length;
    const at150 = builtTall.length;
    const at200 = builtTall.filter(b => b.height >= 200).length;
    const at300 = builtTall.filter(b => b.height >= 300).length;
    return { total: RAW_DATA.length, tallest, toppedOut, uc, at150, at200, at300 };
  }, []);

  function toggleSort(key) {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
    setPage(0);
  }
  function onFilterChange(setter) {
    return (v) => { setter(v); setPage(0); };
  }

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .gd-row:hover { background: #F4EFDF; }
        .gd-th { cursor: pointer; user-select: none; position: sticky; top: 0; background: #F4EFDF; z-index: 1; }
        .gd-th:hover { color: #1C2A33; }
        .gd-pg:not(:disabled):hover { background: #E4DFCC; }
        select, input { font-family: 'IBM Plex Mono', monospace; }
        button.gd-pg { font-family: 'IBM Plex Mono', monospace; background:#F4EFDF; border:1px solid #D8D0BC; padding:6px 12px; cursor:pointer; font-size:12.5px; }
        button.gd-pg:disabled { opacity:0.4; cursor:default; }
        ::selection { background: #C9932E55; }
      `}</style>

      <header style={styles.header}>
        <div>
          <h1 style={styles.h1}>Gush Dan Skyline</h1>
          <p style={styles.subtitle}>
            {stats.total.toLocaleString()} building projects tracked across {ALL_CITIES.length} cities in the Tel Aviv metro area
          </p>
        </div>
        <label style={styles.coreToggle}>
          <input type="checkbox" checked={onlyCore} onChange={(e) => onFilterChange(setOnlyCore)(e.target.checked)} />
          Tel Aviv + Inner Ring only
        </label>
      </header>

      <section style={styles.totalStrip}>
        <Stat label="All projects tracked" value={stats.total.toLocaleString()} />
      </section>

      <section style={styles.panel}>
        <div style={styles.panelHead}>Skyscrapers (150m+)</div>
        <div style={styles.statStripInPanel}>
          <Stat label="Tallest (Completed)" value={stats.tallest ? `${stats.tallest.height} m` : "—"} sub={stats.tallest?.name} />
          <Stat label="Topped out" value={stats.toppedOut} />
          <Stat label="Under construction" value={stats.uc} />
          <Stat label="150m+" value={stats.at150} />
          <Stat label="200m+" value={stats.at200} />
          <Stat label="300m+" value={stats.at300} />
        </div>
      </section>

      <section style={styles.panel}>
        <div style={styles.panelHead}>Skyline — tallest {skylineData.length} in current filter (height known only)</div>
        <div style={styles.skyline}>
          {skylineData.map((b) => (
            <div
              key={b.id}
              onMouseEnter={() => setHovered(b.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...styles.bar,
                height: `${(b.height / skylineMax) * 100}%`,
                background: cityColor(b.city),
                opacity: b.status === "Proposed" || b.status === "Planned" ? 0.35 : b.status === "Under Construction" ? 0.6 : 1,
                borderStyle: (b.status === "Proposed" || b.status === "Planned") ? "dashed" : "solid",
                outline: hovered === b.id ? "2px solid #1C2A33" : "none",
                outlineOffset: "1px",
              }}
              title={`${b.name} — ${b.height} m`}
            />
          ))}
        </div>
        <div style={styles.skylineTooltip}>
          {hovered !== null && skylineData.find((b) => b.id === hovered)
            ? (() => {
                const b = skylineData.find((x) => x.id === hovered);
                return (
                  <>
                    {`${b.name} — ${b.height} m, ${b.floors ?? "?"} floors, ${b.city} (${b.status})`}
                    {b.url && (
                      <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ ...styles.threadLink, marginLeft: "10px" }}>
                        View thread ↗
                      </a>
                    )}
                  </>
                );
              })()
            : "Hover a bar (or a row below) for details"}
        </div>
      </section>

      <section style={styles.filters}>
        <input
          placeholder="Search name or city…"
          value={query}
          onChange={(e) => onFilterChange(setQuery)(e.target.value)}
          style={styles.input}
        />
        <MultiSelect
          label="cities"
          allLabel="All cities"
          selected={citySet}
          onToggle={toggleCity}
          options={ALL_CITIES.filter(c => cityCounts.has(c)).map(c => ({ value: c, label: c, count: cityCounts.get(c) }))}
          totalCount={scopedRows.length}
        />
        <MultiSelect
          label="statuses"
          allLabel="All statuses"
          selected={statusSet}
          onToggle={toggleStatus}
          options={STATUSES.filter(s => statusCounts.has(s)).map(s => ({ value: s, label: s, count: statusCounts.get(s) }))}
          totalCount={scopedRows.length}
        />
        <div style={styles.pillGroup}>
          {HEIGHT_BRACKETS.map(hb => (
            <button
              key={hb.key}
              className="gd-pg"
              onClick={() => { setHeightBracket(hb.key); setPage(0); }}
              style={{ ...styles.pill, ...(heightBracket === hb.key ? styles.pillActive : {}) }}
            >
              {hb.label}
            </button>
          ))}
        </div>
        {filtersActive && (
          <button className="gd-pg" onClick={clearFilters} style={styles.clearBtn}>Clear filters ✕</button>
        )}
        <div style={styles.countBadge}>{filtered.length.toLocaleString()} shown</div>
      </section>

      {filtersActive && (
        <div style={styles.chipRow}>
          {onlyCore && <Chip label="Tel Aviv + Inner Ring" onClear={() => onFilterChange(setOnlyCore)(false)} />}
          {Array.from(citySet).map(c => <Chip key={`c-${c}`} label={`City: ${c}`} onClear={() => toggleCity(c)} />)}
          {Array.from(statusSet).map(s => <Chip key={`s-${s}`} label={`Status: ${s}`} onClear={() => toggleStatus(s)} />)}
          {heightBracket !== "all" && <Chip label={HEIGHT_BRACKETS.find(h => h.key === heightBracket).label} onClear={() => setHeightBracket("all")} />}
          {query && <Chip label={`"${query}"`} onClear={() => onFilterChange(setQuery)("")} />}
        </div>
      )}

      <section style={{ ...styles.panel, display: "flex", flexDirection: "column" }}>
        <div style={styles.panelHead}>Full catalog</div>
        <div style={styles.tableScroll}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, textAlign: "right" }}>#</th>
                <SortTh label="Name" sortKey="name" activeKey={sortKey} dir={sortDir} onClick={toggleSort} />
                <SortTh label="City" sortKey="city" activeKey={sortKey} dir={sortDir} onClick={toggleSort} />
                <SortTh label="Height (m)" sortKey="height" activeKey={sortKey} dir={sortDir} onClick={toggleSort} align="right" />
                <SortTh label="Floors" sortKey="floors" activeKey={sortKey} dir={sortDir} onClick={toggleSort} align="right" />
                <SortTh label="Status" sortKey="status" activeKey={sortKey} dir={sortDir} onClick={toggleSort} />
                <th style={styles.th}>Thread</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((b, i) => (
                <tr
                  key={b.id}
                  className="gd-row"
                  onMouseEnter={() => setHovered(b.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={hovered === b.id ? { background: "#F4EFDF" } : undefined}
                >
                  <td style={{ ...styles.td, textAlign: "right", fontFamily: "IBM Plex Mono, monospace", color: "#7A7360" }}>{page * pageSize + i + 1}</td>
                  <td style={styles.td}>{b.name}</td>
                  <td style={{ ...styles.td, color: cityColor(b.city) }}>{b.city}</td>
                  <td style={{ ...styles.td, textAlign: "right", fontFamily: "IBM Plex Mono, monospace" }}>{b.height ?? "—"}</td>
                  <td style={{ ...styles.td, textAlign: "right", fontFamily: "IBM Plex Mono, monospace" }}>{b.floors ?? "—"}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, background: statusColor(b.status) + "22", color: statusColor(b.status), borderColor: statusColor(b.status) + "55" }}>
                      <span style={{ ...styles.statusDot, background: statusColor(b.status) }} />
                      {b.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {b.url ? (
                      <a href={b.url} target="_blank" rel="noopener noreferrer" style={styles.threadLink}>
                        View thread ↗
                      </a>
                    ) : (
                      <span style={styles.threadLinkMissing}>—</span>
                    )}
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={7} style={styles.emptyRow}>No buildings match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={styles.pager}>
          <button className="gd-pg" disabled={page === 0} onClick={() => setPage(0)}>« First</button>
          <button className="gd-pg" disabled={page === 0} onClick={() => setPage(p => Math.max(0, p - 1))}>← Prev</button>
          <span style={styles.pagerLabel}>Page {page + 1} of {totalPages}</span>
          <button className="gd-pg" disabled={page >= totalPages - 1} onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}>Next →</button>
          <button className="gd-pg" disabled={page >= totalPages - 1} onClick={() => setPage(totalPages - 1)}>Last »</button>
          <span style={styles.pageSizeWrap}>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
              style={styles.pageSizeSelect}
            >
              {PAGE_SIZES.map(n => <option key={n} value={n}>{n} / page</option>)}
            </select>
          </span>
        </div>
      </section>

      <section style={styles.panel}>
        <div style={styles.mapCreditHead}>
          <a
            href="https://www.google.com/maps/d/viewer?usp=sharing&mid=14qUYB3xAs5k_VlWP0IaUJgSte_Y"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapCreditHeadLink}
          >
            Tel Aviv Area Projects Map by Ynhockey
          </a>
        </div>
        <iframe
          src="https://www.google.com/maps/d/embed?mid=14qUYB3xAs5k_VlWP0IaUJgSte_Y"
          width="100%"
          height="480"
          style={styles.mapFrame}
          loading="lazy"
          title="Tel Aviv Area Projects map"
        />
        <div style={styles.mapNote}>
          Via SkyscraperCity — real pinned locations, colour-coded by status. Shows all mapped projects; not scoped to your filters above.
        </div>
      </section>
    </div>
  );
}

function SortTh({ label, sortKey, activeKey, dir, onClick, align }) {
  const active = sortKey === activeKey;
  return (
    <th
      className="gd-th"
      style={{ ...styles.th, textAlign: align || "left" }}
      onClick={() => onClick(sortKey)}
      aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
    >
      {label}
      <span style={{ ...styles.sortArrow, opacity: active ? 1 : 0.25 }}>
        {active && dir === "asc" ? "▲" : "▼"}
      </span>
    </th>
  );
}

function Chip({ label, onClear }) {
  return (
    <span style={styles.chip}>
      {label}
      <button onClick={onClear} style={styles.chipClear} aria-label={`Remove filter: ${label}`}>✕</button>
    </span>
  );
}

function MultiSelect({ label, allLabel, selected, onToggle, options, totalCount }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const summary = selected.size === 0
    ? `${allLabel} (${totalCount})`
    : selected.size === 1
    ? Array.from(selected)[0]
    : `${selected.size} ${label}`;

  return (
    <div ref={ref} style={styles.msWrap}>
      <button type="button" className="gd-pg" onClick={() => setOpen(o => !o)} style={styles.msButton}>
        {summary}
        <span style={styles.msCaret}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={styles.msPopover}>
          {options.map(opt => (
            <label key={opt.value} style={styles.msOption}>
              <input
                type="checkbox"
                checked={selected.has(opt.value)}
                onChange={() => onToggle(opt.value)}
              />
              <span style={styles.msOptionLabel}>{opt.label}</span>
              <span style={styles.msOptionCount}>{opt.count}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div style={styles.stat}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
      {sub && <div style={styles.statSub}>{sub}</div>}
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Inter', sans-serif", background: "#ECE7D8", color: "#1C2A33", padding: "28px 32px 40px", minHeight: "100%" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid #D8D0BC", paddingBottom: "18px", marginBottom: "20px" },
  h1: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "32px", margin: 0, letterSpacing: "-0.01em" },
  subtitle: { margin: "6px 0 0", color: "#4B5A63", fontSize: "14.5px" },
  coreToggle: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer" },
  statStrip: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "#D8D0BC", border: "1px solid #D8D0BC", marginBottom: "20px" },
  statStripInPanel: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1px", background: "#D8D0BC" },
  totalStrip: { display: "inline-block", border: "1px solid #D8D0BC", marginBottom: "20px" },
  stat: { background: "#F4EFDF", padding: "16px 18px" },
  statValue: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "26px" },
  statLabel: { fontSize: "12.5px", color: "#4B5A63", marginTop: "2px" },
  statSub: { fontSize: "11.5px", color: "#7A7360", marginTop: "4px", fontFamily: "'IBM Plex Mono', monospace" },
  panel: { border: "1px solid #D8D0BC", background: "#F4EFDF", marginBottom: "20px" },
  panelHead: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#4B5A63", padding: "10px 16px", borderBottom: "1px solid #D8D0BC" },
  skyline: { display: "flex", alignItems: "flex-end", gap: "2px", height: "160px", padding: "16px 16px 0" },
  bar: { flex: "1 1 0", minWidth: "3px", borderTop: "1px solid #1C2A33" },
  skylineTooltip: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", padding: "8px 16px 14px", color: "#1C2A33", minHeight: "1.4em", boxSizing: "content-box" },
  filters: { display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" },
  input: { padding: "9px 12px", border: "1px solid #D8D0BC", background: "#F4EFDF", fontSize: "13px", minWidth: "180px", color: "#1C2A33" },
  select: { padding: "9px 12px", border: "1px solid #D8D0BC", background: "#F4EFDF", fontSize: "13px", color: "#1C2A33" },
  countBadge: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", color: "#4B5A63", marginLeft: "auto" },
  msWrap: { position: "relative" },
  msButton: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 12px", fontSize: "13px" },
  msCaret: { fontSize: "9px", opacity: 0.6 },
  msPopover: {
    position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 5,
    background: "#F4EFDF", border: "1px solid #D8D0BC", boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
    minWidth: "220px", maxHeight: "320px", overflowY: "auto", padding: "6px",
  },
  msOption: {
    display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px",
    fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap",
  },
  msOptionLabel: { flex: 1 },
  msOptionCount: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", color: "#7A7360" },
  pillGroup: { display: "flex", gap: "6px", flexWrap: "wrap" },
  pill: { fontFamily: "'IBM Plex Mono', monospace" },
  pillActive: { background: "#1C2A33", color: "#F4EFDF", borderColor: "#1C2A33" },
  clearBtn: { color: "#8B3A3A" },
  chipRow: { display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "-10px", marginBottom: "20px" },
  chip: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px",
    background: "#E4DFCC", border: "1px solid #D8D0BC", padding: "4px 6px 4px 10px",
    color: "#4B5A63",
  },
  chipClear: {
    background: "none", border: "none", cursor: "pointer", color: "#8B3A3A",
    fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", padding: "0 2px",
  },
  tableScroll: { maxHeight: "560px", overflow: "auto" },
  sortArrow: { fontSize: "9px", marginLeft: "5px", display: "inline-block" },
  statusBadge: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    fontSize: "11.5px", fontFamily: "'IBM Plex Mono', monospace",
    border: "1px solid", padding: "2px 8px", whiteSpace: "nowrap",
  },
  statusDot: { width: "6px", height: "6px", borderRadius: "50%", display: "inline-block" },
  emptyRow: { padding: "28px 14px", textAlign: "center", color: "#7A7360", fontSize: "13px" },
  threadLink: { color: "#8A6D3B", fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", textDecoration: "none", borderBottom: "1px solid #C9A96A" },
  threadLinkMissing: { color: "#B8B1A0", fontFamily: "IBM Plex Mono, monospace", fontSize: "12px" },
  pageSizeWrap: { marginLeft: "auto" },
  pageSizeSelect: {
    padding: "6px 10px", border: "1px solid #D8D0BC", background: "#F4EFDF",
    fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace", color: "#4B5A63",
  },
  mapFrame: { display: "block", border: "none" },
  mapNote: { fontSize: "11.5px", color: "#7A7360", padding: "10px 16px 14px", borderTop: "1px solid #D8D0BC" },
  mapCreditHead: { padding: "18px 16px 14px", borderBottom: "1px solid #D8D0BC" },
  mapCreditHeadLink: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "24px",
    color: "#2E3B40",
    textDecoration: "underline",
    textDecorationColor: "#C9932E",
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
    letterSpacing: "-0.01em",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { textAlign: "left", padding: "9px 14px", borderBottom: "1px solid #D8D0BC", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", color: "#7A7360", fontWeight: 500 },
  td: { padding: "8px 14px", borderBottom: "1px solid #E4DFCC" },
  pager: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #D8D0BC" },
  pagerLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#4B5A63" },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GushDanSkyline />);
