pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {

  struct Announcement{
    string title;
    string subject;
    string content;
    string imageHash;
    address from_;
    string timestamp;
  }

  //上传公示
  Announcement[] private aArr;
  function setAnnouncement(string memory title,string memory subject,string memory content,string memory imageHash,string memory timestamp ) public {
    aArr.push(Announcement({
      title: title,
      subject: subject,
      content: content,
      imageHash: imageHash,
      from_: msg.sender,
      timestamp: timestamp
    }));
  }

  //展示全部公示
  function getAll() public view returns (string[] memory,string[] memory,string[] memory,string[] memory,address[] memory,string[] memory) {
    string[] memory titles=new string[](aArr.length);
    string[] memory  subjects=new string[](aArr.length);
    string[] memory contents=new string[](aArr.length);
    string[] memory imageHashs=new string[](aArr.length);
    address[] memory froms=new address[](aArr.length);
    string[] memory timestamps=new string[](aArr.length);
    for (uint i = 0; i < aArr.length; i++){
      titles[i]=aArr[i].title;
      subjects[i]=aArr[i].subject;
      contents[i]=aArr[i].content;
      imageHashs[i]=aArr[i].imageHash;
      froms[i]=aArr[i].from_;
      timestamps[i]=aArr[i].timestamp;
    }
    return(titles,subjects,contents,imageHashs,froms,timestamps);
  }
}
