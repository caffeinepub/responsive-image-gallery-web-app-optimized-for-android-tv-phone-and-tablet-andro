import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type ImageId = Nat32;

  type Image = {
    id : ImageId;
    title : Text;
    imageType : ImageType;
  };

  type ImageType = {
    #url : Text;
    #externalBlob : Storage.ExternalBlob;
  };

  module Image {
    public func compare(image1 : Image, image2 : Image) : Order.Order {
      Nat32.compare(image1.id, image2.id);
    };
  };

  var nextId : ImageId = 0;
  let imageMap = Map.empty<ImageId, Image>();

  public shared ({ caller }) func addImage(title : Text, imageType : ImageType) : async ImageId {
    let id = nextId;
    let image : Image = {
      id;
      title;
      imageType;
    };

    imageMap.add(id, image);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getImage(id : ImageId) : async Image {
    switch (imageMap.get(id)) {
      case (null) { Runtime.trap("Image does not exist") };
      case (?image) { image };
    };
  };

  public query ({ caller }) func getAllImages() : async [Image] {
    imageMap.values().toArray().sort();
  };

  public query ({ caller }) func getImageBlobs() : async [(ImageId, Storage.ExternalBlob)] {
    let blobsIter = imageMap.entries().flatMap(
      func((id, image)) {
        switch (image.imageType) {
          case (#externalBlob(blob)) { [(id, blob)].values() };
          case (_) { [].values() };
        };
      }
    );
    blobsIter.toArray();
  };

  public shared ({ caller }) func addUrlImage(title : Text, url : Text) : async ImageId {
    await addImage(title, #url(url));
  };

  public shared ({ caller }) func addUploadedImage(title : Text, blob : Storage.ExternalBlob) : async ImageId {
    await addImage(title, #externalBlob(blob));
  };
};
