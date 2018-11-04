// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require dropzone
//= require_tree .

$(function(){
  if ($('.dropzone').length) {
    var dropzone = new Dropzone(document.body, {
      previewsContainer: ".dropzone",
      clickable: false,
      url: "/file_cache",
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      previewTemplate: "\
        <div class=\"dz-preview dz-file-preview\">\
          <span class=\"cancel-file\" data-dz-remove>&times;</span>\
          <span data-dz-name></span> (<span data-dz-size></span>)\
          <div class=\"upload-progress\">\
            <div class=\"upload-progress-bar\" data-dz-uploadprogress></div>\
          </div>\
        </div>\
      ",
    });

    var currentFileNames = getCsvFromArray('.file_names');
    var currentFileSizes = getCsvFromArray('.file_sizes');

    if(currentFileNames.length > 1) {
      currentFileNames.forEach(function(name, index) {
        mockFile = { name: name, size: currentFileSizes[index] };
        dropzone.emit("addedfile", mockFile);
      });
    }

    else if(currentFileNames.length > 0){
      dropzone.emit("addedfile", { name: currentFileNames, size: currentFileSizes });
    }

    dropzone.on("success", function(file, response) {
      files = {
        ids: { values: [], selector: '.cached_file_ids' },
        names: { values: [], selector: '.file_names' },
        sizes: { values: [], selector: '.file_sizes' }
      };

      $.each(files, function (index, attrs) {
        attrs.values = getCsvFromArray(attrs.selector);
      });

      files.ids.values.push(response.file_id);
      files.names.values.push(response.name);
      files.sizes.values.push(response.size);

      $.each(files, function (index, attrs) {
        $(attrs.selector).val(attrs.values.join(","));
      });
    });

    dropzone.on("error", function(file, response) {
      $('.flashes').html('<div class="alert alert-danger">' + response.text +'</div>');
      dropzone.emit("removedfile", file);
    });

    dropzone.on("removedfile", function(file) {
      files = {
        cachedIds: { values: [], selector: '.cached_file_ids' },
        storedIds: { values: [], selector: '.stored_file_ids' },
        names: { values: [], selector: '.file_names' },
        sizes: { values: [], selector: '.file_sizes' }
      };

      allFileIds = allCurrentFileIds();

      $.each(files, function (index, attrs) {
        attrs.values = getCsvFromArray(attrs.selector);
      });

      for (var i = 0; i < allFileIds.length; i++) {
        if (files.names.values[i] == file.name) {
          if(files.cachedIds.values.indexOf(allFileIds[i]) > -1) {
            files.cachedIds.values.splice(files.cachedIds.values.indexOf(allFileIds[i]), 1);
          } else {
            files.storedIds.values.splice(files.storedIds.values.indexOf(allFileIds[i]), 1);
          }

          allFileIds.splice(allFileIds.indexOf(allFileIds[i]), 1);

          fileNames = files.names.values;
          fileNames.splice(fileNames.indexOf(fileNames[i]), 1);

          fileSizes = files.sizes.values;
          fileSizes.splice(fileSizes.indexOf(fileSizes[i]), 1);
        }
      }

      $.each(files, function (index, attrs) {
        $(attrs.selector).val(attrs.values.join(","));
      });
    });
  }
});

Dropzone.autoDiscover = false;

function allCurrentFileIds() {
  var currentVal = [$('.cached_file_ids').val(), $('.stored_file_ids').val()].filter(Boolean).join();

  if (currentVal == "") {
    return [];
  } else {
    return currentVal.split(",");
  }
}

function getCsvFromArray(selector) {
  var currentVal = $(selector).val();

  if (currentVal == "") {
    return [];
  } else {
    return currentVal.split(",");
  }
}
