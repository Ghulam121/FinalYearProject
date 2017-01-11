<?php
/* 
I applied this get_meta_tags function too but it didnt worked
*/
$url = $_REQUEST["q"];

//$tags = get_meta_tags('http://php.net/manual/en/function.get-meta-tags.php');

//echo $tags['author'];
//echo $tags['keywords'];     
//$description = $tags['description']; 
//echo $tags['geo_position'];
$url = 'http://www.bin-co.com/php/scripts/load/';
function get_data($url) {
	$ch = curl_init();

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}
$returned_content = get_data($url);
$doc = new DOMDocument();
@$doc->loadHTML($returned_content);
$nodes = $doc->getElementsByTagName('p');
$title = $nodes->item(1)->nodeValue;
$metas = $doc->getElementsByTagName('meta');

for ($i = 0; $i < $metas->length; $i++)
{
    $meta = $metas->item($i);
    if($meta->getAttribute('name') == 'description')
        $description = $meta->getAttribute('content');
    if($meta->getAttribute('name') == 'keywords')
        $keywords = $meta->getAttribute('content');
}

echo "Description: $description";


?>