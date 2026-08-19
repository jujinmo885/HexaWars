const screens={menu:document.getElementById('main-menu'),room:document.getElementById('room-screen'),settings:document.getElementById('settings-screen'),rules:document.getElementById('rules-screen'),game:document.getElementById('game-screen')};
const pieces=[
['01','디코더','Decoder','폰',1,2,'이동 종료 시 인접 아군 1기를 지정한다. 그 기물에 적용된 모든 효과를 해제한 뒤, 그 기물을 원하는 방향으로 1칸 이동시킨다.'],
['02','인코더','Encoder','폰',1,2,'이동 종료 시 인접 아군 1기를 지정한다. 지정 기물의 다음 이동거리 최대치를 1턴 동안 +1칸 증가시킨다.'],
['03','트리플 액세서','Triple Accessor','폰',1,3,'이동 종료 시 자신의 전방 3방향 중 1칸에 있는 적 1기를 지정한다. 지정 기물은 다음 자신의 턴까지 이동할 수 없다.'],
['04','멀티플렉서','Multiplexer','폰',1,3,'양옆 측면에 아군이 각각 1기 이상 인접하면 그중 2기의 발동능력을 공유한다. 자신의 턴에 공유 능력 1개를 선택하여 1회 발동할 수 있다.'],
['05','디멀티플렉서','Demultiplexer','폰',1,3,'자신에게 이로운 효과가 적용될 때 그 효과를 자신에게 적용하지 않고 인접한 다른 아군 최대 2기에게 각각 1회 복제한다.'],
['06','버퍼','Buffer','룩',2,2,'전후 직선에서 적 공격의 대상이 되면 해당 공격을 1회 무효화하고 즉시 후방으로 1칸 이동한다.'],
['07','리피터','Repeater','룩',4,3,'이동 경로상에 아군이 1기 이상 존재하면 그중 1기가 직전 자신의 턴에 사용한 발동능력을 자신이 1회 발동한다.'],
['08','라우터','Router','룩',6,4,'아군이 이동 중 자신이 있는 칸을 통과하면 그 아군의 남은 이동 경로를 가능한 측면 방향 중 하나로 90도 전환한다.'],
['09','게이트웨이','Gateway','룩',8,5,'이동 종료 시 전후 직선상에 다른 아군이 있으면 그중 1기를 자신의 바로 앞 칸으로 이동시킨다. 해당 칸이 점유되어 있으면 발동하지 않는다.'],
['10','프록시','Proxy','룩',12,6,'자신과 연결된 아군 1기를 지정한다. 자신이 이동하거나 공격할 때, 해당 행동의 출발 기물은 자신이 아니라 지정 기물로 판정한다.'],
['11','스위치','Switch','비숍',2,2,'이동 종료 시 측면으로 인접한 아군 1기와 자신의 위치를 교환한다.'],
['12','크로스바','Crossbar','비숍',4,3,'대각선 양방향으로 아군들이 일렬로 인접해 있으면 그 일렬에 포함된 아군들은 서로의 지속능력을 공유한다.'],
['13','브리지','Bridge','비숍',6,4,'자신의 좌우에 서로 인접하지 않은 두 아군 연결망이 존재하면 자신을 경유하는 하나의 연결망으로 취급한다.'],
['14','인터페이스','Interface','비숍',8,5,'이동 종료 시 적과 인접하면 그 적의 지속능력을 다음 자신의 턴 종료까지 복사한다.'],
['15','터미널','Terminal','비숍',12,6,'한 턴 동안 자신에게 다른 기물의 효과가 3회 이상 적용되면 다음 자신의 턴 종료까지 이동거리와 공격범위를 2배로 한다.'],
['16','액세스','Access','나이트',2,2,'도약 착지 시 인접 아군이 있으면 1기를 선택하여 원하는 방향으로 1칸 이동시킨다.'],
['17','트리플 액세스','Triple Access','나이트',3,3,'도약 착지 시 인접 적이 있으면 1기를 선택하여 원하는 방향으로 1칸 밀친다.'],
['18','포인터','Pointer','나이트',4,4,'이동 종료 시 빈 칸 1곳을 지정한다. 다음 턴에 해당 칸으로 이동하는 아군 1기는 그 이동에 필요한 이동거리에서 그 칸까지의 거리를 차감하지 않는다.'],
['19','프로토콜','Protocol','나이트',6,5,'이번 턴에 다른 아군 2기 이상이 자신보다 먼저 능력을 발동했다면 다음 공격 1회가 대상의 지속능력과 발동능력을 무시한다.'],
['20','패킷','Packet','나이트',8,6,'도약 경로 아래에 아군이 2기 이상 존재하면 경로 아래의 각 아군은 자신의 발동능력을 1회 강제 발동한다.'],
['21','프로세서','Processor','퀸',2,4,'자신과 연결된 아군의 능력 조건에 필요한 인접 아군 수를 각각 1 감소시킨다. 감소 결과는 0 미만이 되지 않는다.'],
['22','컴파일러','Compiler','퀸',4,5,'서로 다른 발동능력을 가진 아군 2기와 동시에 인접하면 두 능력을 각각 1회 즉시 발동한다.'],
['23','커널','Kernel','퀸',6,6,'자신을 포함해 3기 이상의 아군이 연속 연결되어 있으면 그 연결망의 모든 아군은 기본 최대 이동거리가 1칸 증가한다.'],
['24','메인프레임','Mainframe','퀸',8,8,'자신과 연결된 아군의 총점이 30점 이상이면 자신의 행동을 소모하여 발동할 수 있다. 다음 1턴 동안 연결된 모든 아군은 각자 최대 2회 행동한다. 발동 후 메인프레임은 다음 자신의 턴 종료까지 모든 능력을 잃는다.'],
['25','오버시어','Overseer','퀸',12,10,'아군 능력이 2회 연속 발동될 때마다 아군 1기를 선택하여 즉시 원하는 방향으로 1칸 이동시킨다. 같은 연쇄에서 동일한 오버시어는 각 연쇄 단계마다 1회만 반응한다.']
];
function showScreen(name){Object.entries(screens).forEach(([key,screen])=>{const visible=key===name;screen.hidden=!visible;screen.classList.toggle('active',visible);});}
function renderPieces(){const list=document.getElementById('piece-list');list.innerHTML=pieces.map(p=>`<article class="piece-card"><div class="piece-head"><span>${p[0]}</span><b>${p[1]}</b><em>${p[2]}</em><strong>${p[5]}점</strong></div><div class="piece-meta">${p[3]} · 최대 ${p[4]}칸</div><p>${p[6]}</p></article>`).join('');}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;switch(b.dataset.action){case'start':showScreen('game');break;case'room':showScreen('room');break;case'rules':showScreen('rules');break;case'settings':showScreen('settings');break;case'back':showScreen('menu');break;case'create-room':{const n=document.getElementById('room-name').value.trim()||'HexaWars Room';document.getElementById('room-status').textContent=`“${n}” 방 생성 기능은 온라인 서버 연결 후 활성화됩니다.`;break;}}});
document.getElementById('contrast-toggle').addEventListener('change',e=>{document.documentElement.style.setProperty('--accent',e.target.checked?'#fff':'#7bd8ff');document.documentElement.style.setProperty('--accent-strong',e.target.checked?'#fff':'#d8f6ff');});
renderPieces();
