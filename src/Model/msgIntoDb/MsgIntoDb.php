<?php

namespace Kerdou\Portfolio\Model\msgIntoDb;

class MsgIntoDb extends \Kerdou\Portfolio\Model\common\ModelInChief
{
    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct()
    {
    }

    public function insertMsgIntoDb($cleanedUpInputData): string
    {
        $insertStmt =
            "INSERT INTO contacts VALUES (
                NULL,
                NOW(),
                :mailSent,
                0,
                :lastName,
                :firstName,
                :company,
                :telPref,
                :tel,
                :mail,
                :msg
                );
            ";

        $this->query = $this->pdo->prepare($insertStmt);
        $this->query->bindParam(':mailSent', $cleanedUpInputData['mailSent']);
        $this->query->bindParam(':lastName', $cleanedUpInputData['lastName']);
        $this->query->bindParam(':firstName', $cleanedUpInputData['firstName']);
        $this->query->bindParam(':company', $cleanedUpInputData['comp']);
        $this->query->bindParam(':telPref', $cleanedUpInputData['telPref']);
        $this->query->bindParam(':tel', $cleanedUpInputData['tel']);
        $this->query->bindParam(':mail', $cleanedUpInputData['mail']);
        $this->query->bindParam(':msg', $cleanedUpInputData['msg']);

        $pdoErrorMessage = $this->pdoPreparedInsertUpdateDeleteExecute();
        return $pdoErrorMessage;
    }
}
