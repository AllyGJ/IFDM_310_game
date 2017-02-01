#pragma strict
import UnityEngine.SceneManagement;

public function loadScene(sceneName:String)
{
	SceneManager.LoadScene(sceneName,LoadSceneMode.Single);
}
