var fs = require('fs');

var getJSON = function(filePath) {
    if(fs.existsSync(filePath)){
        var content = fs.readFileSync(filePath, {encoding:'utf8'});
        if(content) return eval('('+content+')');
        else return '{}';
    }
};

var projConf = getJSON('../proj-conf.json');

fis.config.set('modules.postpackager', 'simple');

fis.config.set('settings.postpackager.simple.autoCombine', true);

fis.config.set('project.exclude', /((?:^|\/)_.*\.(?:scss))|(.*\.inline\.html)/i);

fis.config.merge({
    modules:{
        parser:{
            scss: 'sass',
            tpl: 'imweb-tpl'
        }
    }
});

fis.config.merge({
    roadmap: {
        ext: {
            scss: 'css',
            tpl: 'js'
        },
        domain: {
            "**.js": ['http://'+projConf.cdnRoot.js+'/'+projConf.path],
            "**.css": ['http://'+projConf.cdnRoot.css+'/'+projConf.path],
            "**.scss": ['http://'+projConf.cdnRoot.css+'/'+projConf.path],
            "**.tpl": ['http://'+projConf.cdnRoot.js+'/'+projConf.path]
        },
        path: [
            {
                reg: projConf.jsNoWrap || '**/mod.js',
                isMod: false
            }, {
                reg: '**.js',
                isMod: true
            }, {
                reg: '**.tpl',
                isMod: true
            }
        ]
    }
});

fis.config.merge({
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        }
    }
});

fis.config.merge({
    deploy: {
        dev: {
            to: '../dev'
        },
        dist: {
            to: '../dist'
        }
    }
});

if(projConf.packSrc) {
    for(var i= 0, len=projConf.packSrc.length; i<len; i++){
        projConf.packSrc[i].to = '../pack/'+projConf.packSrc[i].to;
    }
    fis.config.set('deploy.pack', projConf.packSrc || []);
}