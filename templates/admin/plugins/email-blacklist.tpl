<h1><i class="fa {faIcon}"></i> Email Blacklist</h1>

<style>
.{nbbId}-settings .checkbox>label {
  font-size: 20px;
}
.{nbbId}-settings .checkbox>label>input {
  margin-bottom: -1px;
}
</style>
<form role="form" class="{nbbId}-settings">
    <fieldset>
        <textarea class="form-control" rows="6" id="domains" name="domains" placeholder="Enter email domains (one per line)"></textarea>
        <div class="checkbox"><label><input type="checkbox" id="isTempMailEnabled" name="isTempMailEnabled"/> Enable isTempMail API check</label></div>
        <button class="btn btn-lg btn-primary" id="save" type="button">Save</button>
    </fieldset>
</form>

<script type="text/javascript">
    require(['settings'], function(Settings) {
        var nbbId = '{nbbId}',
        klass = nbbId + '-settings',
        wrapper = $( '.' + klass );

        Settings.load(nbbId, wrapper);
    
        wrapper.find('#save').on('click', function(e) {
            e.preventDefault();
            Settings.save(nbbId, wrapper, function() {
                app.alert({
                    type: 'success',
                    alert_id: nbbId,
                    title: 'Reload Required',
                    message: 'Please reload your NodeBB to have your changes take effect',
                    clickfn: function() {
                        socket.emit('admin.reload');
                    }
                });
            });
        });
    });
</script>