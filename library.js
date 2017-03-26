var pluginData = require('./plugin.json');
var winston = module.parent.require('winston');
var Meta = module.parent.require('./meta');
var pluginSettings;
var Plugin = {};

pluginData.nbbId = pluginData.id.replace(/nodebb-plugin-/, '');

Plugin.load = function (params, callback) {

    var render = function (req, res, next) {
        res.render('admin/plugins/' + pluginData.nbbId, pluginData || {});
    };

    Meta.settings.get(pluginData.nbbId, function (err, settings) {
        if (err)
            return callback(err);
        if (!settings) {
            winston.warn('[plugins/' + pluginData.nbbId + '] Settings not set or could not be retrieved!');
            return callback();
        }

        winston.info('[plugins/' + pluginData.nbbId + '] Settings loaded');
        pluginSettings = settings;

        params.router.get('/admin/plugins/' + pluginData.nbbId, params.middleware.admin.buildHeader, render);
        params.router.get('/api/admin/plugins/' + pluginData.nbbId, render);

        callback();
    });
};

Plugin.filterEmailRegister = function (regData, next) {
    if (regData && regData.userData && regData.userData.email)
        if (isBlacklistedDomain(regData.userData.email))
            return next(new Error('Blacklisted email provider.'));
    return next(null, regData);
};

Plugin.filterEmailUpdate = function (data, next) {
    if (data && data.email)
        if (isBlacklistedDomain(data.email))
            return next(new Error('Blacklisted email provider.'));
    return next(null, data);
};

function isBlacklistedDomain(email) {
    var domain = email.substring(email.indexOf('@') + 1);
    var lines = pluginSettings.domains.split('\n');
    for (var i = 0; i < lines.length; i++)
        if (domain === lines[i].trim())
            return true;
    return false;
}

Plugin.admin = {
    menu: function (header, callback) {
        header.plugins.push({
            "route": '/plugins/' + pluginData.nbbId,
            "icon": pluginData.faIcon,
            "name": pluginData.name
        });

        callback(null, header);
    }
};

module.exports = Plugin;