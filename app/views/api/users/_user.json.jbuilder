json.extract! user, :id, :username, :name, :biography

if user.profile_photo.attachment
    json.profilePhotoUrl url_for(user.profile_photo)
else
    json.profilePhotoUrl nil
end