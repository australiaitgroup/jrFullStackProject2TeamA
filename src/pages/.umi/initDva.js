import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Users/jracademy/Documents/FullStackProject/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/jracademy/Documents/FullStackProject/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/jracademy/Documents/FullStackProject/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/jracademy/Documents/FullStackProject/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('/Users/jracademy/Documents/FullStackProject/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/jracademy/Documents/FullStackProject/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/jracademy/Documents/FullStackProject/src/models/user.js').default) });
