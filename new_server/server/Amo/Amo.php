<?php
namespace Amo;

use AmoCRM;

class Amo
{
  private $amo;
  private $data;
  private $leadId;

  public function __construct($config)
  {
    $this->amo = new AmoCRM\Client($config['amo_subdomain'], $config['amo_login'], $config['amo_apikey']);;
  }

  public function sendDataToCRM()
  {
        $isAmo = isset($this->data['amo_id']) && count($this->amo->lead->apiList([ 'id' => (int)$this->data['amo_id'] ])) > 0;
        $lead = $this->amo->lead;

    
         // $lead['status_id'] = 29262109;
         
         // объявление неразобранного
        $unsorted = $this->amo->unsorted;
        $unsorted['source'] = 'printlab.biz.ua';
        $unsorted['source_uid'] = null;

        if(!$isAmo){
          
            // Создание неразобранного и добавление параметров
            $unsorted['source_data'] = [
                'data' => [
                    'name_1' => [
                        'type' => 'text',
                        'id' => 'name',
                        'element_type' => '1',
                        'name' => 'Заказ№',
                        'value' => $this->data['orderId'],
                    ]
                ],
                'form_id' => uniqid(),
                'form_type' => 1,
                'origin' => [
                    'ip' => null,
                    'datetime' => null,
                    'referer' => '',
                ],
                'date' => time(),
                'from' => 'printlab.biz.ua',
                'form_name' => 'My name for form',
            ];

          if(isset($this->data['orderId'])){
            $lead['price'] = $this->data['calcProp']['price'];

            $lead['name'] = $this->data['orderId'];
            $lead['tags'] = ['printlab.biz.ua'];

            $lead->addCustomField(144157,
              $this->getTemplate($this->data)
            );
            
            $lead->addCustomField(510355,
              isset($this->data['orderId'])?$this->data['orderId']:''
            );
            
            switch ($this->data['delivery']['method']){
                case 'np':
                    $lead->addCustomMultiField(161665,
                        [243219]
                    );
                    $lead->addCustomField(160765,
                        $this->data['delivery']['city'].' №'.$this->data['delivery']['warehouse']
                    );
                    break;
                case 'kiev':
                    $lead->addCustomMultiField(161665,
                        [243223]
                    );
                    break;
                default:
                    $lead->addCustomMultiField(161665,
                        [243221]
                    );
                    break;
            }
            
          }else{
            $lead->addCustomField(144157,$this->data['user']['message']);
          }
          
          
     
          if (isset($this->data['files'])) {
              $files = '';
              foreach($this->data['files'] as $fileRecord){
                $files .= $fileRecord['url'].PHP_EOL;
              }
              $lead->addCustomField(373157,$files);
          }
          
          // добавление лида  к неразобранному
        $unsorted->addDataLead($lead);
        //$this->setLeadId($id);

        //$id = $lead->apiAdd();
        //$this->setLeadId($id);

      $contactList =  $this->amo->contact->apiList([ 'query' => $this->data['user']['phone'] ]);


      $contact = $this->amo->contact;
      //телефон
      $contact->addCustomField(129409, [
        [$this->data['user']['phone'], 'MOB'],
      ]);
    
      //email
      
      $contact->addCustomField(129411, [
        [$this->data['user']['email'], 'PRIV'],
      ]);
      
      // Заполнение полей модели
      $contact['name'] = $this->data['user']['name'];
      $contact['linked_leads_id'] = [(int)$id];

      // Добавление нового контакта и получение его ID
      if(isset($contactList[0])){
        $contact->apiUpdate((int)$contactList[0]['id'], 'now');
      }else{
        $id = $contact->apiAdd();
         
      }
      $unsorted->addDataContact($contact);
      // отправка неразобраного
      $unsortedId = $unsorted->apiAddForms();
      
    }
    elseif($this->data['pay_status'] == 'success'){
      $lead['status_id'] = 29262115;
      $lead->apiUpdate($this->data['amo_id'], 'now');
    }
  }

  private function getTemplate($params)
  {
    $trans =array(
      'white'=>'белая',
       'transparent'=>'прозрачная',
       'simple'=>'Простой',
       'hard'=>'Сложный',
       'rectangle'=>'Прямоугольная',
       'star'=>'"Звезда"',
       'circle'=>'"Круг"',
       'ellipse'=>'"Эллипс"',
       'radius100'=>'"Радиус 10мм"',
       'radius50'=>'"Радиус 5мм"',
       'radius35'=>'"Радиус 3,5мм"',
       'chopped'=>'"Рубленый"',
       'cloud'=>'"Облако"',
       'accent'=>'"Акцент"',
       'matt'=>'Матовая',
       'gloss'=>'Глянцевая'
   );
   $message = file_get_contents('./order_detail');
   $message = str_replace('%order%', $params['orderId'], $message);
   $message = str_replace('%price%', $params['calcProp']['price'], $message);
   $message = str_replace('%quantity%', $params['calcProp']['quantity'], $message);
   $message = str_replace('%sizes%', $params['calcProp']['height'].'x'.$params['calcProp']['width'], $message);
   $message = str_replace('%basis%', $params['calcProp']['basis'].'('.$trans[$params['calcProp']['basis_param']].')', $message);
   $message = str_replace('%cut_form%', $trans[$params['calcProp']['cut_form']], $message);
   if($params['calcProp']['lamination']) {
       $message = str_replace('%lamination%', $trans[$params['calcProp']['lamination']], $message);
   }else{
       $message = str_replace('%lamination%', '-', $message);
   }
   return $message;
  }

  public function getLeadId()
  {
    return $this->leadId;
  }

  public function setLeadId($id)
  {
    $this->leadId = $id;
  }

  public function setData($data)
  {
    $this->data = $data;
  }

}