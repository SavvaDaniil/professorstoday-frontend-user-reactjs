


function padTo2Digits(num) 
{
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) 
  {
    return (...);
  }

export default function OnlineAuditoriumChatMessage(props)
{

    const onlineAuditoriumMessageLiteViewModel = props.onlineAuditoriumMessageLiteViewModel;
    if(onlineAuditoriumMessageLiteViewModel === null)
    {
        return(
            <>-</>
        )
    }

    let author = "<не найдено>";
    const userMicroViewModel = onlineAuditoriumMessageLiteViewModel.userMicroViewModel;
    if(userMicroViewModel !== null)
    {
        author = userMicroViewModel.secondname + " " + userMicroViewModel.firstname;
    }

    const dateOfAdd = new Date(onlineAuditoriumMessageLiteViewModel.date_of_add);
    let dateOfAddString = "";
    if(dateOfAdd !== null && dateOfAdd instanceof Date)
    {
        dateOfAddString = formatDate(dateOfAdd);
    }

    return(
        <div className="message">
            <div className={"block" + (onlineAuditoriumMessageLiteViewModel.is_owner_of_request ? " from-user" : " from-other")}>
                <p className="author-and-date">{author} {dateOfAddString}</p>
                <p className="message-content">
                    {onlineAuditoriumMessageLiteViewModel.message_content}
                </p>
            </div>
        </div>
    )
}